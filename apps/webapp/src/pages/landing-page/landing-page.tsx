import { Button, Container, Grid, Paper, Typography } from "@mui/material"
import { Cart } from "@ventionMachineCloudTest/models"
import axios from "axios"
import React from "react"

import { useCreateOneCartMutation } from "../../redux/endpoints/carts-endpoints"
import { useLandingPageStyles } from "./landing-page.styles"

export function LandingPage() {
  const classes = useLandingPageStyles()
  const [createOneCart, { isLoading: isCreatingCart }] = useCreateOneCartMutation()

  const handleGetStarted = async () => {
    const newCart = {
      cartItems: [],
    } as Cart

    const response = await createOneCart({ cart: newCart })

    if (response) {
      const seedResponse = await axios.get("http://localhost:3333/api/products/seed")
      console.log(seedResponse)
    } else {
      console.log("Error creating cart")
    }
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  Welcome to Our Market Place
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid item>
                    <Button variant="contained" color="primary" className={classes.getStartedButton} onClick={handleGetStarted}>
                      Get Started
                    </Button>
                  </Grid>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default LandingPage
