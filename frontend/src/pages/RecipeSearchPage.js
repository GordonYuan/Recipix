import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import searchRecipesByNameApi from "../apis/searchRecipesByNameApi";
import Grid from "@material-ui/core/Grid";
import RecipeCard from "../components/RecipeCard";
import TagFilter from "../components/TagFilter";

const RecipeSearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");
  const [tagsState, setTagsState] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      if (input !== "") {
        const response = await searchRecipesByNameApi(input, tagsState);
        setRecipes(response.data.recipes);
      }
    }
    getRecipes();
  }, [tagsState, input]);

  const handleChange = (e, idx) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const response = await searchRecipesByNameApi(input, tagsState);
      const data = response.data;
      setRecipes(data.recipes);
      // console.log(data);
    }
  };

  return (
    <div>
      <p>Recipe Search Page</p>
      <React.Fragment>
        <TextField
          fullWidth
          id="recipeSearch"
          name="recipeSearch"
          placeholder="Search for a Recipe..."
          variant="outlined"
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <br />
        <br />
        <TagFilter tagsState={tagsState} setTagsState={setTagsState} />
        <Grid container spacing={2}>
          {recipes &&
            recipes.map((recipe) => (
              <Grid key={recipe.recipe_id} item xs={4}>
                <RecipeCard
                  title={recipe.recipe_name}
                  imagePath={recipe.image}
                  recipeId={recipe.recipe_id}
                />
              </Grid>
            ))}
        </Grid>
      </React.Fragment>
    </div>
  );
};

export default RecipeSearchPage;
