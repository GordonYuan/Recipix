import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, setIn } from "formik";
import LoginForm from "./LoginForm";
import loginApi from "../apis/loginApi";
import { withRouter } from "react-router";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
    ></Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({history}) => {
  //const [invalid, setInvalid] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", password: "", valid: true }}
      onSubmit={async (values) => {
        const response = await loginApi(values);
        console.log(response);
        if (response.status == "403") {
          values.valid = false;
        } else {
          window.localStorage.setItem("token", response.data.token);
          history.push("/");
        }
      }}
    >
      {(props) => <LoginForm {...props} />}
    </Formik>
  );
};

export default withRouter(SignIn);
