import axios from "axios";

const getRecipesApi = (data) => {
  let baseUrl = "http://127.0.0.1:5000/recipe/all";
  //Data comes in the form of an array of {value:,label:} pairs
  //However this isn't accepted by the API. We need these to be in the form of
  //{name,category} pairs
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  return axios
    .get(baseUrl, config)
    .then((response) => response)
    .catch((error) => error.response);
};

export default getRecipesApi;
