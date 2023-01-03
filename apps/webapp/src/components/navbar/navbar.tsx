import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Badge,
  useTheme,
  CardMedia,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Avatar,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import useNavbarStyles from './navbar.styles';
import { CartItem } from '@ventionMachineCloudTest/models';
import { useGetManyCartsQuery, useGetCartItemsQuery } from '../../redux/endpoints/carts-endpoints';
import { useSelector } from 'react-redux';

export interface NavbarProps {
  cartId: number;
}

export function Navbar({cartId}: NavbarProps) {
    const classes = useNavbarStyles();
    const [open, setOpen] = useState(false);

    const state = useSelector((state: unknown) => state);


    const updateCart = useGetCartItemsQuery({ id: cartId }) || undefined;
    const cartItems = updateCart?.data || [];

    async function updateCartAndRefetch() {
      await updateCart.refetch();
    }

    useEffect(() => {
        // this seems questionable. Need to look into how to do this more efficiently
        updateCartAndRefetch();
    }, [open]);
    
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Vention Machine Cloud Test
            </Typography>
            <IconButton 
              color="inherit" 
              className={classes.cartButton}
              onClick={() => setOpen(!open)}
            >
              <ShoppingCart />
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
                  <ListItemText
                    primary={item.product.name}
                    secondary={`${item.product.price}`}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    );
  }

export default Navbar;