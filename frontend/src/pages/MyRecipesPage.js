import React from "react";
import getRecipeByTokenApi from "../apis/getRecipeByTokenApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import UserRecipeCard from "../components/UserRecipeCard";

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

const MyRecipesPage = (props) => {
  const classes = useStyles();
  const token = props.token;
  //Login check already done
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function fetchRecipes() {
      const response = await getRecipeByTokenApi();
      console.log({ response });
      console.log(response.data);
      setRecipes(response.data.recipes);
    }
    fetchRecipes();
  }, []);
  if (recipes == []) {
    return (
      <div className={classes.root} align="center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Grid container spacing={2}>
      {recipes &&
        recipes.map((recipe) => (
          <Grid key={recipe.recipe_id} item xs={4}>
            <UserRecipeCard
              title={recipe.recipe_name}
              imagePath={recipe.image}
              recipeId={recipe.recipe_id}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default MyRecipesPage;
