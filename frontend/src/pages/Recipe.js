import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import getRecipeByIdApi from "../apis/getRecipeByIdApi";
import CircularProgress from "@material-ui/core/CircularProgress";

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

// const callRecipeApi = async (recipeId) => {
//   const response = await getRecipeByIdApi({ recipe_id: recipeId });
//   console.log(response);
//   return response.data.recipe;
// };

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

  // console.log({recipe,recipeId});

  if (recipe == null) {
    return (
      <div className={classes.root} align="center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container component="main">
      <Typography component="h1" variant="h5" align="center">
        {recipe.recipe_name}
      </Typography>
      <Typography
        component="h1"
        variant="h5"
        align="center"
      >{`Contributed by ${recipe.recipe_creator}`}</Typography>
      <CardMedia
        style={{ height: 400 }}
        className={classes.media}
        image={"data:image/png;base64," + recipe.image}
      />
      <Grid item xs={12}>
        <h1>Description</h1>
        <Typography>{recipe.description}</Typography>
        <h2>Tags </h2>
        <Grid container spacing={3}>
          {recipe.tags.map((tag) => (
            <Grid item xs={2}>
              {tag.tag}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <hr></hr>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <h1>Ingredients</h1>
          <Typography>
            {recipe.ingredients.map((ingredients) => (
              <li>{`${ingredients.quantity} ${ingredients.name}`}</li>
            ))}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <h1>Instructions</h1>
          <ol>
            <Typography>
              {recipe.method.map((method) => (
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
