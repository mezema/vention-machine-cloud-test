import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

export const useProductItemStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 345,
        position: 'relative',
      },
      media: {
        height: 140,
      },
      button: {
        position: 'absolute',
        top: 10,
        right: 10,
        display: 'none',
      },
      buttonHover: {
        '&:hover': {
          display: 'block',
        },
      },
}))

