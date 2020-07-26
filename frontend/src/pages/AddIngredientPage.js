import addIngredientApi from "../apis/addIngredientApi";
import React from "react";
import { withRouter } from "react-router";
import { Formik } from "formik";
import AddIngredientForm from "./AddIngredientForm";

const AddIngredientPage = ({ history }) => {
  return (
    <Formik
      initialValues={{ ingredient: "", category: "" }}
      onSubmit={async (values) => {
        console.log(values);
        const response = await addIngredientApi(values);
        console.log(response);
        history.push("/");
      }}
    >
      {(props) => <AddIngredientForm {...props} />}
    </Formik>
  );
};

export default withRouter(AddIngredientPage);
