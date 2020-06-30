import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { groupedIngredients } from "./data/data";
import getIngredientsApi from "../apis/getIngredientsApi";
import getRecipesApi from "../apis/getRecipesApi";

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
/*
const recipes = [
  { id: 1, title: "Pancakes", imagePath: "pancake.png" },
  { id: 2, title: "Pancakes", imagePath: "pancake.png" },
  { id: 3, title: "Pancakes", imagePath: "pancake.png" },
  { id: 4, title: "Pancakes", imagePath: "pancake.png" },
];
*/
const HomePage = () => {
  const animatedComponents = makeAnimated();

  const [ingredients, setIngredients] = useState([]);
  const [runningList, setRunningList] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredientsApi();
      setIngredients(response.data);
    }
    async function fetchRecipes() {
      const response = await getRecipesApi();
      setRecipes(response.data);
      console.log(recipes);
    }
    fetchIngredients();
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {ingredients.map((ingredient) => (
        <p>{ingredient.name}</p>
      ))}
      {/* need to map ingredients to what select takes in */}
      {/* {recipes.map((recipe) => (
        <RecipeCard title={recipe.title} imagePath={recipe.imagePath} />
      ))} */}
      <Select
        defaultValue={""}
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={groupedIngredients}
        formatGroupLabel={formatGroupLabel}
        onChange={(e) => console.log(e)}
        isMulti
      />
    </div>
  );
};
export default HomePage;
