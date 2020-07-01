import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { groupedIngredients } from "./data/data";
import getIngredientsApi from "../apis/getIngredientsApi";
import RecipeCard from "../components/RecipeCard";
import searchRecipesApi from "../apis/searchRecipesApi";
import Grid from "@material-ui/core/Grid";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const HomePage = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredientsApi();
      setIngredients(response.data);
    }
    fetchIngredients();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ADD INGREDIENTS, GET RECIPES</h1>
      <Select
        isMulti
        defaultValue={""}
        closeMenuOnSelect={false}
        components={makeAnimated()}
        options={groupedIngredients}
        formatGroupLabel={formatGroupLabel}
        onChange={async (e) => {
          if (!!e) {
            const response = await searchRecipesApi(e);
            const data = response.data;
            setRecipes(data.recipes);
            console.log({ e, data, recipes });
          } else {
            setRecipes([]);
          }
        }}
      />
      <br />
      <Grid container justify="space-between" spacing={2}>
        {recipes &&
          recipes.map((recipe) => (
            <Grid item xs={4}>
              <RecipeCard
                title={recipe.recipe_name}
                imagePath={"pancake.png"}
                recipeId={recipe.recipe_id}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
export default HomePage;
