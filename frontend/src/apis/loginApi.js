import axios from "axios";

const loginApi = async (details) => {
  let baseUrl = "http://127.0.0.1:5000/login";

  function transformDetails(details) {
    const transformedDetails = {
      username: details.username,
      password: details.password,
    };
    return transformedDetails;
  }
  const payload = { ingredients: details.map(transformDetails) };
  console.log(payload);
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

export default loginApi;
