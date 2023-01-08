import { Grid, makeStyles } from "@mui/material"
import { Product } from "@ventionMachineCloudTest/models"
import React from "react"

import { ProductItem } from "../product/product-item"
import { useProductListStyles } from "./product-list.styles"

export interface ProductListProps {
  products: Product[]
  cartId: number
  cartUpdate: (update: boolean) => () => void
}

export function ProductList({ products = [], cartId, cartUpdate }: ProductListProps) {
  const classes = useProductListStyles()

  return (
    <Grid container spacing={3} className={classes.root}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductItem product={product} cartId={cartId} cartUpdate={cartUpdate} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductList
