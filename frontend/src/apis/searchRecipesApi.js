import axios from "axios";

const searchRecipesApi = async (ingredients) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/search";

  function transformIngredient(ingredient) {
    const transformedIngredient = {
      name: ingredient.value,
    };
    return transformedIngredient;
  }
  const payload = ingredients.map(transformIngredient);
  console.log(payload);
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const response = await axios.post(baseUrl, payload, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default searchRecipesApi;
