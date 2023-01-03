import clsx from "clsx"
import React from "react"

import { SnackbarListener } from "../components/global/snackbar-listener/snackbar-listener"
import { MarketplacePage } from "../pages/marketplace-page/marketplace-page"
import { Navbar } from "../components/navbar/navbar"
import { useAppStyles } from "./app.styles"
import { LandingPage } from "../pages/landing-page/landing-page"
import { useCreateOneCartMutation, useGetManyCartsQuery } from "../redux/endpoints/carts-endpoints"
import { Cart } from "@ventionMachineCloudTest/models"

export const App = () => {
  const classes = useAppStyles()
  const [createOneCart, { isLoading: isCreatingCart }] = useCreateOneCartMutation();
  const { data: carts = [], isFetching, isLoading, isError } = useGetManyCartsQuery();
  
  return (
      <div className={clsx(classes.app, classes.cardContainer)}>
        <SnackbarListener />
        {
          carts.length === 0 ? <LandingPage /> : (
            <>
              <Navbar cartId={carts[0]?.id}/>
              <MarketplacePage cartId={carts[0]?.id}/>
            </>
          )
        }
      </div>
  )
}
