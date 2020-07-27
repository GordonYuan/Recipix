import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import getIngredientsApi from "../apis/getIngredientsApi";
import RecipeCard from "../components/RecipeCard";
import searchRecipesApi from "../apis/searchRecipesApi";
import getTagsApi from "../apis/getTagsApi";
import Grid from "@material-ui/core/Grid";
import TagFilter from "../components/TagFilter";

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

const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

const mapToOptions = (data) => {
  // console.log({ data });
  if (!!data) {
    return data.map((entry) => {
      return {
        label: entry.category,
        options: entry.ingredients.map((ingredient) => {
          return { value: ingredient.name, label: titleCase(ingredient.name) };
        }),
      };
    });
  }
};

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsState, setTagsState] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredientsApi();
      setIngredients(mapToOptions(response.data.categories));
    }
    async function fetchTags() {
      const response = await getTagsApi();
      setTags(response.data.tags);
    }
    fetchIngredients();
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchRecipes() {
      const response = await searchRecipesApi(ingredientsList, tagsState);
      setRecipes(response.data.recipes);
    }
    fetchRecipes();
  }, [tagsState, ingredientsList]);

  const filterOption = ({ label, value }, string) => {
    label = label.toLocaleLowerCase();
    string = string.toLocaleLowerCase();
    // default search
    if (label.includes(string) || value.includes(string)) return true;

    // check if a group as the filter string as label
    const groupOptions = ingredients.filter((group) =>
      group.label.toLocaleLowerCase().includes(string)
    );

    if (groupOptions) {
      for (const groupOption of groupOptions) {
        // Check if current option is in group
        const option = groupOption.options.find((opt) => opt.value === value);
        if (option) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>ADD INGREDIENTS, GET RECIPES</h1>
      <Select
        isMulti
        defaultValue={""}
        closeMenuOnSelect={false}
        components={makeAnimated()}
        options={ingredients}
        formatGroupLabel={formatGroupLabel}
        filterOption={filterOption}
        onChange={async (currentList) => {
          if (!!currentList) {
            setIngredientsList(currentList);
            // const response = await searchRecipesApi(currentList);
            // const data = response.data;
            // setRecipes(data.recipes);
          } else {
            setRecipes([]);
          }
        }}
      />
      <TagFilter
        tags={tags}
        tagsState={tagsState}
        setTagsState={setTagsState}
      />
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
    </>
  );
};
export default HomePage;
