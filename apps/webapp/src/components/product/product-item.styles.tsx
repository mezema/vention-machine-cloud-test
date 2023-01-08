import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

export const useProductItemStyles = makeStyles((theme: Theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  sendIcon: {
    marginLeft: theme.spacing(1),
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },
}))
