import { Product } from "@ventionMachineCloudTest/models"
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import React from "react";

import { ProductItem } from '../product/product-item'; // Import the ProductItem component
import { useProductListStyles } from "./product-list.styles";

export interface ProductListProps {
  products: Product[];
}

export function ProductList({ products = [] }: ProductListProps) {
  const classes = useProductListStyles()
  
  return (
    <>
      <List container spacing={{ xs: 4, md: 6, xl: 8 }} justifyContent={'center'}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </List>
    </>
  );
}

export default ProductList;

const List = styled(Grid)`
  padding: 2rem 0;
`;
