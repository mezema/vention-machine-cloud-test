import clsx from "clsx"
import React, { useState } from "react"

import { SnackbarListener } from "../components/global/snackbar-listener/snackbar-listener"
import { Navbar } from "../components/navbar/navbar"
import { LandingPage } from "../pages/landing-page/landing-page"
import { MarketplacePage } from "../pages/marketplace-page/marketplace-page"
import { useGetManyCartsQuery } from "../redux/endpoints/carts-endpoints"
import { useAppStyles } from "./app.styles"

export const App = () => {
  const classes = useAppStyles()
  const { data: carts = [] } = useGetManyCartsQuery()
  const [cartUpdated, setCartUpdated] = useState(false)

  const cartUpdate = (update: boolean) => () => {
    setCartUpdated(update)
  }

  return (
    <div className={clsx(classes.app, classes.cardContainer)}>
      <SnackbarListener />
      {carts.length === 0 ? (
        <LandingPage />
      ) : (
        <>
          <Navbar cartId={carts[0]?.id} cartUpdate={cartUpdate} />
          <MarketplacePage cartId={carts[0]?.id} cartUpdate={cartUpdate} />
        </>
      )}
    </div>
  )
}
