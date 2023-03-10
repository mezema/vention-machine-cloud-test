import { useGetManyProductsQuery } from '../../redux/endpoints/products-endpoints';
import { ProductList } from '../../components/product-list/product-list';
import { useMarketplacePageStyles } from './marketplace-page.styles';
import React from 'react';

export interface MarketplacePageProps {
  cartId: number;
  cartUpdate: (update: boolean) => () => void;
}

export function MarketplacePage({cartId, cartUpdate}: MarketplacePageProps) {
  const classes = useMarketplacePageStyles();
  const { data: products = [] }
    = useGetManyProductsQuery({ page: 1, limit: 10 });

  return (
    <div className={classes.root}>
      <ProductList products={products} cartId={cartId} cartUpdate={cartUpdate}/>
    </div>
  );
}
