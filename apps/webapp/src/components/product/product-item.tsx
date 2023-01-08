import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import SendIcon from "@mui/icons-material/Send"
import { Button, Card, CardActionArea, CardContent, CardMedia, Chip, Rating, Typography } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import Popover from "@mui/material/Popover"
import Snackbar from "@mui/material/Snackbar"
import { Product } from "@ventionMachineCloudTest/models"
import axios from "axios"
import React, { useEffect, useState } from "react"

import { useAddCartItemMutation, useItemExistsQuery, useRemoveCartItemMutation } from "../../redux/endpoints/carts-endpoints"
import { useGetRatingQuery } from "../../redux/endpoints/products-endpoints"
import { useProductItemStyles } from "./product-item.styles"

export interface ProductItemProps {
  product: Product
  cartId: number
  cartUpdate: (update: boolean) => () => void
}

export function ProductItem({ product, cartId, cartUpdate }: ProductItemProps) {
  const classes = useProductItemStyles()

  const { imageUrl, name, price } = product
  const [isInCart, setIsInCart] = useState(false)
  const { data: inCart } = useItemExistsQuery({ cartId: cartId, productId: product.id })
  const [removeCartItem, { isLoading: isRemovingCartItem }] = useRemoveCartItemMutation()
  const [addCartItem, { isLoading: isAddingCartItem }] = useAddCartItemMutation()
  const [isSubmittingRating, setIsSubmittingRating] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [rating, setRating] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  useEffect(() => {
    setIsInCart(inCart)
  }, [inCart])

  const handleAddToCart = async () => {
    const response = await addCartItem({ id: cartId, productId: product.id })
    if (response) {
      setIsInCart(true)
      cartUpdate(true)
    } else {
      console.log("error adding to cart")
    }
  }

  const handleRemoveFromCart = async () => {
    const response = await removeCartItem({ id: cartId, productId: product.id })
    if (response) {
      setIsInCart(false)
      cartUpdate(true)
    } else {
      console.log("error removing from cart")
    }
  }

  const handleCartAction = () => {
    if (isInCart) {
      handleRemoveFromCart()
    } else {
      handleAddToCart()
    }
  }

  const rateProduct = async (event, newValue) => {
    setRating(newValue)
  }

  const submitRating = async () => {
    if (rating === 0) {
      setSnackbarMessage("Please set a rating before submitting")
      setOpenSnackbar(true)
    } else {
      setIsSubmittingRating(true)
      try {
        await axios.post(`http://localhost:3333/api/products/${product.id}/rating`, {
          rating,
        })
        setSuccessMessage("Rating submitted successfully")
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          handleClose()
        }, 2000)
      } catch (error) {
        console.error(error)
        setErrorMessage("Error submitting rating")
      } finally {
        setIsSubmittingRating(false)
        handleClose()
      }
    }
  }

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />
      {errorMessage ? (
        <Snackbar open={errorMessage !== ""} autoHideDuration={6000} onClose={() => setErrorMessage("")} message={errorMessage} />
      ) : success ? (
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)} message={successMessage} />
      ) : null}
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={name}
            onMouseEnter={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}
          >
            {showButton ? (
              <Button
                variant="contained"
                color="primary"
                style={{
                  position: "relative",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                startIcon={
                  isRemovingCartItem || isAddingCartItem ? (
                    <CircularProgress size={24} />
                  ) : isInCart ? (
                    <RemoveShoppingCartIcon />
                  ) : (
                    <AddShoppingCartIcon />
                  )
                }
                onClick={handleCartAction}
                disabled={isRemovingCartItem || isAddingCartItem}
              >
                {isRemovingCartItem ? "Removing..." : isAddingCartItem ? "Adding..." : isInCart ? "Remove from Cart" : "Add to Cart"}
              </Button>
            ) : null}
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ${price}
            </Typography>
            <div className={classes.ratingContainer}>
              <Rating name="product-rating" value={rating} onChange={rateProduct} />
              <SendIcon className={classes.sendIcon} onClick={handleClick} />
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography className={classes.typography}>Are you sure you want to submit this rating?</Typography>
              <div className={classes.buttonContainer}>
                {isSubmittingRating ? (
                  <CircularProgress />
                ) : (
                  <Button variant="contained" color="primary" onClick={submitRating}>
                    Submit
                  </Button>
                )}
                <Button variant="contained" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </Popover>
            {isInCart ? <Chip label="In cart" color="info" variant="filled" style={{ position: "absolute", top: "0", left: "0" }} /> : null}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default ProductItem
