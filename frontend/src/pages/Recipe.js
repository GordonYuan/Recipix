import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Recipe = ({ match }) => {
  const recipeId = match.params.id;
  //Test data
  const testRecipe = {
    recipe_creator: "hotmario258",
    recipe_name: "eggs and Cheese ham",
    image: "base64String",
    tags: [
      {
        tag: "entree",
      },
    ],
    ingredients: [
      {
        name: "cheese",
        amount: "500",
        units: "grams",
      },
      { name: "bacon", amount: "2", units: "slices" },
    ],
    servings: 0,
    method: [
      {
        step_number: 0,
        instruction: "Boil the water for 50 minutes until evaporated",
      },
      { step_number: 1, instruction: "Condense your water and start again" },
    ],
    description: "Eggs and cheese ham is a deluxe meal served for kings",
  };
  const classes = useStyles();
  return (
    <Container component="main">
      <Typography component="h1" variant="h5" align="center">
        {testRecipe.recipe_name}
      </Typography>
      <CardMedia
        style={{ height: 400 }}
        className={classes.media}
        image={require("../components/images/pancake.png")}
      />
      <Grid item xs={12}>
        <h1>Description</h1>
        <Typography>{testRecipe.description}</Typography>
        <h2>
          Tags<Typography>{testRecipe.tags.map((tag) => tag.tag)}</Typography>
        </h2>
      </Grid>
      <hr></hr>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <h1>Ingredients</h1>
          <Typography>
            {testRecipe.ingredients.map((ingredients) => (
              <li>
                {`${ingredients.amount} ${ingredients.units} ${ingredients.name}`}
              </li>
            ))}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <h1>Instructions</h1>
          <ol>
            <Typography>
              {testRecipe.method.map((method) => (
                <li>{`${method.instruction}`}</li>
              ))}
            </Typography>
          </ol>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Recipe;
