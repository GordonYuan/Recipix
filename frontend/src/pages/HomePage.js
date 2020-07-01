import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { groupedIngredients } from "./data/data";
import getIngredientsApi from "../apis/getIngredientsApi";
import getRecipesApi from "../apis/getRecipesApi";
import RecipeCard from "../components/RecipeCard";
import searchRecipesApi from "../apis/searchRecipesApi";

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

const testRecipes = [
  { id: 1, title: "Pancakes", imagePath: "pancake.png" },
  { id: 2, title: "Pancakes", imagePath: "pancake.png" },
  { id: 3, title: "Pancakes", imagePath: "pancake.png" },
  { id: 4, title: "Pancakes", imagePath: "pancake.png" },
];

const HomePage = (props) => {
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
    }
    fetchIngredients();
    fetchRecipes();
  }, []);

  return (
    <div>
      {/* {ingredients.map((ingredient) => (
        <p>{ingredient.name}</p>
      ))}
      {console.log({ recipes, ingredients })} */}
      <h1 style={{ textAlign: "center" }}>ADD INGREDIENTS, GET RECIPES</h1>
      <Select
        defaultValue={""}
        closeMenuOnSelect={false}
        components={animatedComponents}
        options={groupedIngredients}
        formatGroupLabel={formatGroupLabel}
        onChange={async (e) => {
          const response = await searchRecipesApi(e);
          const result = response.data;
          console.log(result);
          { {result.map((recipe) => (
            <RecipeCard
              title={recipe.title}
              imagePath={recipe.imagePath}
              recipeId={recipe.id}
            />
          ))} }
        }}
        isMulti
      />
      
      {/* { {result.map((recipe) => (
        <RecipeCard
          title={recipe.title}
          imagePath={recipe.imagePath}
          recipeId={recipe.id}
        />
      ))} } */}
    </div>
  );
};
export default HomePage;
