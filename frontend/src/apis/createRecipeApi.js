import axios from "axios";

const createRecipeApi = async (values, setError) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/add";

  const payload = {
    recipe_name: values.recipeName,
    image: values.image,
    tags: values.tags,
    ingredients: values.ingredients,
    servings: values.servings,
    method: values.instructions,
    description: values.description,
  };
  console.log(payload);
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
    },
  };

  return axios
    .post(baseUrl, payload, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default createRecipeApi;
