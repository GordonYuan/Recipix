import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TagFilter from "../components/TagFilter";
import RecipeCard from "../components/RecipeCard";
import searchRecipesApi from "../apis/searchRecipesApi";
import requestRecipeApi from "../apis/requestRecipeApi";
import getIngredientsApi from "../apis/getIngredientsApi";
import getRecommendationsApi from "../apis/getRecommendationsApi";
import RecommendationChip from "../components/RecommendationChip";

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

export const titleCase = (str) => {
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
  const [tagsState, setTagsState] = useState([]);
  const [open, setOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const signedIn = !!window.localStorage.getItem("token");

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredientsApi();
      setIngredients(mapToOptions(response.data.categories));
    }
    fetchIngredients();
  }, []);

  useEffect(() => {
    async function fetchRecipes() {
      if (ingredientsList.length > 0) {
        console.log(ingredientsList);
        const response = await searchRecipesApi(ingredientsList, tagsState);
        setRecipes(response.data.recipes);
      } else {
        setRecipes([]);
      }
    }
    async function fetchRecommendations() {
      if (ingredientsList.length > 0) {
        const response = await getRecommendationsApi(
          ingredientsList,
          tagsState
        );
        setRecommendations(response.data.ingredients);
        console.log(recommendations);
      }
    }
    fetchRecipes();
    fetchRecommendations();
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

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
        value={ingredientsList}
        onChange={async (currentList) => {
          if (!!currentList) {
            setIngredientsList(currentList);
          } else {
            setIngredientsList([]);
          }
        }}
      />
      <TagFilter tagsState={tagsState} setTagsState={setTagsState} />
      <RecommendationChip
        ingredientsList={ingredientsList}
        recommendations={recommendations}
        setIngredients={setIngredientsList}
      ></RecommendationChip>
      <Grid
        container
        spacing={2}
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
      >
        <Grid item>
          <Link href="/add-ingredient" variant="body2">
            {"Don't see an ingredient? Add an ingredient"}
          </Link>
        </Grid>
      </Grid>

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
      {ingredientsList.length !== 0 && signedIn && (
        <Grid container justify="center">
          <Button
            style={{ align: "center" }}
            color="inherit"
            onClick={async () => {
              const response = await requestRecipeApi(ingredientsList);
              if (response.status === 200) {
                setOpen(true);
                setIngredientsList([]);
              }
            }}
          >
            Request a Recipe for Your Ingredients
          </Button>
        </Grid>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Recipe Request Created"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};
export default HomePage;
