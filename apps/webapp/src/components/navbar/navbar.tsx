import { ShoppingCart } from "@mui/icons-material"
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  CardMedia,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material"
import { CartItem } from "@ventionMachineCloudTest/models"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { useGetCartItemsQuery, useGetManyCartsQuery } from "../../redux/endpoints/carts-endpoints"
import useNavbarStyles from "./navbar.styles"

export interface NavbarProps {
  cartId: number
  cartUpdate: (update: boolean) => () => void
}

export function Navbar({ cartId, cartUpdate }: NavbarProps) {
  const classes = useNavbarStyles()
  const [open, setOpen] = useState(false)

  const state = useSelector((state: unknown) => state)

  const updateCart = useGetCartItemsQuery({ id: cartId }) || undefined
  const cartItems = updateCart?.data || []

  async function updateCartAndRefetch() {
    await updateCart.refetch()
  }

  useEffect(() => {
    // this seems questionable. Need to look into how to do this more efficiently
    updateCartAndRefetch()
  }, [open, cartUpdate])

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Vention Machine Cloud Test
          </Typography>
          <IconButton color="inherit" className={classes.cartButton} onClick={() => setOpen(!open)}>
            <ShoppingCart />
            <span className="badge">{cartItems?.length}</span>
          </IconButton>
        </Toolbar>
      </AppBar>
      {open && (
        <div className={classes.cartMenuItem}>
          <List>
            {cartItems?.map((item: CartItem, index: number) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={item.product.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={item.product.name} secondary={`${item.product.price}`} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  )
}

export default Navbar
