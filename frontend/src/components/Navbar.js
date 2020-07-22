import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import {
  HOME_PAGE,
  RECIPE_SEARCH,
  ADD_RECIPE,
  LOGIN,
  MY_RECIPES,
} from "../constants/urlConstants";

const NavBar = ({ history }) => {
  const signedIn = !!window.localStorage.getItem("token");

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
          spacing={24}
        >
          <Grid item>
            <img
              src={require("./images/Recipix_small_cropped.png")}
              alt="logo"
              onClick={() => history.push(HOME_PAGE)}
              style={{ height: "36px", cursor: "pointer" }}
            />
          </Grid>
          <Grid item>
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
              <Button
                color="inherit"
                onClick={() => {
                  window.localStorage.removeItem("token");
                  history.push(HOME_PAGE);
                }}
              >
                LOGOUT
              </Button>
            ) : (
              <Button color="inherit" onClick={() => history.push(LOGIN)}>
                LOGIN
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(NavBar);
