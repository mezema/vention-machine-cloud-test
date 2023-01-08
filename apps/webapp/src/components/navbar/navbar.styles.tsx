import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

const useNavbarStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  title: {
    flexGrow: 1,
  },
  cartButton: {
    color: "white",
    marginRight: theme.spacing(2),
  },
  cartBadge: {
    color: "white",
    backgroundColor: "#FF8E53",
  },
  cartMenu: {
    marginTop: theme.spacing(1),
  },
  cartMenuItem: {
    backgroundColor: "#FF8E53",
    position: "fixed",
    top: 64,
    right: 0,
    width: 200,
    background: "white",
    zIndex: 1,
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  },
  cartMenuItemText: {
    marginLeft: theme.spacing(2),
  },
}))

export default useNavbarStyles
