import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router";
import AddRecipeForm from "./AddRecipeForm";
import createRecipeApi from "../apis/createRecipeApi";
import { HOME_PAGE } from "../constants/urlConstants";
import * as Yup from "yup";

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

const AddRecipePage = ({ history }) => {
  return (
    <Formik
      initialValues={{
        recipeName: "",
        image: "",
        tags: [{ tag: "placeholder" }],
        ingredients: [],
        servings: "",
        instructions: [],
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
