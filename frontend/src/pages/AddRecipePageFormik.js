import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { withRouter } from "react-router";
import AddRecipeForm from "./AddRecipeForm";
import createRecipeApi from "../apis/createRecipeApi";
import { HOME_PAGE, EDIT_RECIPE } from "../constants/urlConstants";
import * as Yup from "yup";
import getRecipeByIdApi from "../apis/getRecipeByIdApi";

const AddRecipeSchema = Yup.object().shape({
  recipeName: Yup.string().required("Recipe name required"),
  ingredients: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Ingredient name required"),
      quantity: Yup.string().required("Quantity and units required"),
    })
  ),
  servings: Yup.number()
    .typeError("Must be a number")
    .required("Enter number of servings"),
  instructions: Yup.array().of(Yup.string()),
  description: Yup.string().required("Please provide a description"),
});

const AddRecipePage = ({ history, match }) => {
  const [dick, setDick] = useState([]);
  useEffect(() => {
    if (match.path === EDIT_RECIPE) {
      console.log(match.params.id.substr(1));
      //Gets Recipe by ID
      // const response = await getRecipeByIdApi({
      //   recipe_id: match.params.id.substr(1),
      // });
      // console.log(response);
    }
    // if (match.params.id.substr[0] ===)
  }, []);

  return (
    <Formik
      initialValues={{
        recipeName: dick.recipeName || "",
        image: "",
        tags: [{ tag: "placeholder" }],
        ingredients: [{ ingredient: "", quantity: "" }],
        servings: "",
        instructions: [{ instruction: "" }],
        description: "",
      }}
      validationSchema={AddRecipeSchema}
      onSubmit={async (values) => {
        const response = await createRecipeApi(values);
        if (response.status === 200) {
          history.push(HOME_PAGE);
        }
      }}
    >
      {(props) => <AddRecipeForm {...props} />}
    </Formik>
  );
};

export default withRouter(AddRecipePage);
