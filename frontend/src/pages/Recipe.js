import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import getRecipeByIdApi from "../apis/getRecipeByIdApi";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingTop: "10px",
    paddingBottom: "10px",
    fontWeight: "bold",
  },
  list: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
}));

const Recipe = ({ match }) => {
  const recipeId = match.params.id.substr(1);
  const classes = useStyles();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      const response = await getRecipeByIdApi({ recipe_id: recipeId });
      console.log({ response });
      console.log(response.data);
      setRecipe(response.data.recipes[0]);
    }
    fetchRecipe();
  }, [recipeId]);

  if (recipe == null) {
    return (
      <div align="center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container component="main">
      <Typography
        variant="h4"
        align="center"
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        {recipe.recipe_name}
      </Typography>
      <CardMedia
        style={{ height: 400 }}
        className={classes.media}
        image={"data:image/png;base64," + recipe.image}
      />

      {/* Recipe Contributor */}
      <Typography
        variant="body"
        style={{
          fontWeight: "bold",
        }}
      >
        Contributor:
      </Typography>
      <Typography
        variant="body"
        style={{
          paddingLeft: "20px",
        }}
      >
        {recipe.recipe_creator}
      </Typography>

      {/* Recipe Description */}
      <div className={classes.list}>
        <Typography variant="h5" className={classes.heading}>
          Description
        </Typography>
        <Typography>{recipe.description}</Typography>
      </div>

      {/* Recipe Categories */}
      <Typography variant="h5" className={classes.heading}>
        Category
      </Typography>
      <Grid container spacing={3}>
        {recipe.tags.map((tag) => (
          <Grid item xs={2}>
            {tag.tag}
          </Grid>
        ))}
      </Grid>

      <hr></hr>

      <Grid
        container
        spacing={3}
        style={{
          paddingTop: "10px",
        }}
      >
        <Grid item xs={4}>
          <Typography
            variant="h5"
            style={{
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
            Ingredients
          </Typography>
          <ul>
            {recipe.ingredients.map((ingredients) => (
              <li
                className={classes.list}
              >{`${ingredients.quantity} ${ingredients.name}`}</li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" className={classes.heading}>
            Cooking Instructions
          </Typography>
          <Typography variant="subtitle2">
            Servings: {recipe.servings}
          </Typography>
          <ol>
            {recipe.method.map((method) => (
              <li className={classes.list}>{`${method.instruction}`}</li>
            ))}
          </ol>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Recipe;
