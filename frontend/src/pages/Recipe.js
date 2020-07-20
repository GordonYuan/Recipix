import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Recipe = ({ match }) => {
  const recipeId = match.params.id;
  //Test data
  const testRecipe = {
    recipe_creator: "hotmario258",
    recipe_name: "eggs and Cheese ham",
    image: "base64String",
    tags: [
      {
        tag: "entree",
      },
    ],
    ingredients: [
      {
        name: "cheese",
        amount: "500",
        units: "grams",
      },
    ],
    servings: 0,
    method: [
      {
        step_number: 0,
        instruction: "Boil the water for 50 minutes until evaporated",
      },
    ],
    description: "Eggs and cheese ham is a deluxe meal served for kings",
  };

  return (
    <Container component="main">
      <div>
        <Typography component="h1" variant="h5" color="primary">
          Recipe Name
        </Typography>
        <Typography>{testRecipe.recipe_name}</Typography>
        <Typography component="h1" variant="h5" color="primary">
          Contributed By
        </Typography>
        <Typography>{testRecipe.recipe_creator}</Typography>
        <Typography component="h1" variant="h5" color="primary">
          Description
        </Typography>
        <Typography>{`${testRecipe.description}`}</Typography>

        <Typography component="h1" variant="h5" color="primary">
          Servings
        </Typography>
        <Typography>{`${testRecipe.servings}`}</Typography>
        <Typography component="h1" variant="h5" color="primary">
          Ingredients
        </Typography>
        <Typography>
          {testRecipe.ingredients.map(
            (ingredient) =>
              `${ingredient.amount} ${ingredient.units} ${ingredient.name}`
          )}
        </Typography>
        <Typography component="h2" variant="h5" color="primary">
          Recipe Tags
        </Typography>
        <Typography>
          {testRecipe.tags.map((element) => `${element.tag}`)}
        </Typography>
        <Typography component="h1" variant="h5" color="primary">
          Recipe Instructions
        </Typography>
        <Typography>
          <ol>
            {testRecipe.method.map((method) => (
              <li>{method.instruction}</li>
            ))}
          </ol>
        </Typography>
      </div>
    </Container>
  );
};

export default Recipe;
