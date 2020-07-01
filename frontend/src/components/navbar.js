import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push("/")}
          >
            RECIPIX
          </Typography>
          <Button
            color="inherit"
            onClick={() => history.push("/recipe-search")}
          >
            SEARCH RECIPES
          </Button>
          <Button color="inherit" onClick={() => history.push("/add-recipe")}>
            ADD RECIPE
          </Button>
          <Button color="inherit" onClick={() => history.push("/login")}>
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(NavBar);
