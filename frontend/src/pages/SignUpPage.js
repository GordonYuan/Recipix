import React from "react";
import { Formik } from "formik";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(props) => <SignUpForm {...props} />}
    </Formik>
  );
};

export default SignUpPage;
