import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router";
import AddRecipeForm from "./AddRecipeForm";
import createRecipeApi from "../apis/createRecipeApi";
import { HOME_PAGE } from "../constants/urlConstants";

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
