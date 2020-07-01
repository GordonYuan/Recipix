import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { groupedIngredients } from "./data/data";
import getIngredientsApi from "../apis/getIngredientsApi";
import getRecipesApi from "../apis/getRecipesApi";
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

  const testIngredients = [
    { value: "cabbage", label: "Cabbage", category: "Vegetables" },
    { value: "onion", label: "Onion", category: "Vegetables" },
  ];

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredientsApi();
      setIngredients(response.data);
    }
    async function fetchRecipes() {
      const response = await getRecipesApi();
      setRecipes(response.data);
    }
    async function searchRecipes(ingredients) {
      const response = await searchRecipesApi(ingredients);
    }
    fetchIngredients();
    fetchRecipes();
    //searchRecipes(testIngredients);
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
        onChange={(e) => console.log(searchRecipesApi(e))}
        isMulti
      />
    </div>
  );
};
export default HomePage;
