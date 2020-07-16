import React from "react";
import { Formik } from "formik";
import SignUpForm from "./SignUpForm";
import signUpApi from "../apis/signUpApi";

const SignUpPage = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
        // await signUpApi(values);
        // do something with token
      }}
    >
      {(props) => <SignUpForm {...props} />}
    </Formik>
  );
};

export default SignUpPage;
