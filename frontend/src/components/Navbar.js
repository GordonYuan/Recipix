import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import {
  HOME_PAGE,
  RECIPE_SEARCH,
  ADD_RECIPE,
  LOGIN,
  MY_RECIPES,
} from "../constants/urlConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({ history }) => {
  const classes = useStyles();
  const signedIn = !!window.localStorage.getItem("token");

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push(HOME_PAGE)}
            textAlign="left"
            style={{ cursor: "pointer" }}
          >
            RECIPIX
          </Typography>
          {signedIn && (
            <Button color="inherit" onClick={() => history.push(MY_RECIPES)}>
              MY RECIPES
            </Button>
          )}
          <Button color="inherit" onClick={() => history.push(RECIPE_SEARCH)}>
            SEARCH RECIPES
          </Button>
          <Button color="inherit" onClick={() => history.push(ADD_RECIPE)}>
            ADD RECIPE
          </Button>
          {signedIn ? (
            <Button color="inherit" onClick={() => history.push(HOME_PAGE)}>
              LOGOUT
            </Button>
          ) : (
            <Button color="inherit" onClick={() => history.push(LOGIN)}>
              LOGIN
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
