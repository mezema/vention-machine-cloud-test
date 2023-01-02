import clsx from "clsx"
import React from "react"

import { SnackbarListener } from "../components/global/snackbar-listener/snackbar-listener"
import { MarketplacePage } from "../pages/marketplace-page/marketplace-page"
import { Navbar } from "../components/navbar/navbar"
import { useAppStyles } from "./app.styles"
import { LandingPage } from "../pages/landing-page/landing-page"

export const App = () => {
  const classes = useAppStyles()  

  return (
      <div className={clsx(classes.app, classes.cardContainer)}>
        <SnackbarListener />
        <Navbar/>
        <MarketplacePage />
      </div>
  )
}
