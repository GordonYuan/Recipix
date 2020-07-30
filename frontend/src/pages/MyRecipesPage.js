import React from "react";
import getRecipeByTokenApi from "../apis/getRecipeByTokenApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "../components/RecipeCard";

const MyRecipesPage = (props) => {
  //Login check already done
  // TODO: make isLoading variable which shows loading icon. If user has no
  // recipes, it should render another ui component
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
  if (recipes === []) {
    return (
      <div align="center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Grid container spacing={2}>
      {recipes &&
        recipes.map((recipe) => (
          <Grid key={recipe.recipe_id} item xs={4}>
            <RecipeCard
              title={recipe.recipe_name}
              imagePath={recipe.image}
              recipeId={recipe.recipe_id}
              canEdit={true}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default MyRecipesPage;
