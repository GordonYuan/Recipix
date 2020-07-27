import axios from "axios";

const searchRecipesByNameApi = async (values) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/searchName";

  const payload = { name: values.name, tags: values.tags };
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  return axios
    .post(baseUrl, payload, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default searchRecipesApi;
