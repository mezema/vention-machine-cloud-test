import { Product } from "@ventionMachineCloudTest/models"

import {
  Typography,
  CardMedia,
  Box,
  Rating,
  Button,
  CardContent,
  Card,
  Chip,
  CardActionArea,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux"

import {
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useGetOneCartQuery,
  useGetManyCartsQuery,
  useGetCartItemQuery,
  useItemExistsQuery,
} from '../../redux/endpoints/carts-endpoints';

import { useProductItemStyles } from './product-item.styles';

export interface ProductItemProps {
  product: Product;
  cartId: number;
}

export function ProductItem({ product, cartId }: ProductItemProps) {
  const classes = useProductItemStyles();

  const { imageUrl, name, price } = product;
  const [isInCart, setIsInCart] = useState(false);
  const {
    data: inCart,
  } = useItemExistsQuery({ cartId: cartId, productId: product.id });
  const [removeCartItem, { isLoading: isRemovingCartItem }] = useRemoveCartItemMutation();
  const [addCartItem, { isLoading: isAddingCartItem }] = useAddCartItemMutation();
  const [rating, setRating] = useState(0);
  const [showButton, setShowButton] = useState(false);


  useEffect(() => {
    setIsInCart(inCart);
  }, [inCart]);

  const handleAddToCart = async () => {
    const response = await addCartItem({ id: cartId, productId: product.id });
    setIsInCart(true);
  };

  const handleRemoveFromCart = async () => {
    const response = await removeCartItem({ id: cartId, productId: product.id });
    setIsInCart(false);
  };

  const handleCartAction = () => {
    if (isInCart) {
      handleRemoveFromCart();
    } else {
      handleAddToCart();
    }
  };

  const rateProduct = (event, newValue) => {
    setRating(newValue);
  };



  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Box>
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={name}
            onMouseEnter={() => setShowButton(true)}
            onMouseLeave={() => setShowButton(false)}
          >
            {showButton
              ? (
                (isInCart
                  ? (
                    <Button variant="contained"
                      color="primary"
                      style={{position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                      startIcon={<RemoveShoppingCartIcon />}
                      onClick={handleCartAction}
                    >
                      Remove from Cart
                    </Button>
                  )
                  : (
                    <Button variant="contained"
                      color="primary"
                      style={{position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                      startIcon={<AddShoppingCartIcon />}
                      onClick={handleCartAction}
                    >
                      Add to Cart
                    </Button>
                  )
                )
              )
              : null
            }
          </CardMedia>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: {price}
          </Typography>
          <Rating
            name="product-rating"
            value={rating}
            onChange={rateProduct}
          />
          {
            isInCart
              ? <Chip label="In cart" color="primary" variant="outlined" style={{position: 'absolute', top: '0', left: '0'}}/>
              : null
          }
        </CardContent>
      </CardActionArea>
    </Card>
  );
}