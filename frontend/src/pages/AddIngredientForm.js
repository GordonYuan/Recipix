import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import getIngredientsApi from "../apis/getIngredientsApi";
import Select from "react-select";
import { titleCase } from "./HomePage";
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

const mapToCategories = (data) => {
  // console.log({ data });
  if (!!data) {
    return data.map((entry) => {
      return {
        label: titleCase(entry.category),
        value: entry.category,
      };
    });
  }
};
const LoginForm = (props) => {
  const classes = useStyles();
  const { handleSubmit, handleChange, values, setFieldValue } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getIngredientsApi();
      console.log(response);
      setCategories(mapToCategories(response.data.categories));
    }
    fetchCategories();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Ingredients
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ingredient"
            label="Enter Ingredient Name"
            name="ingredient"
            autoComplete="ingredient"
            onChange={handleChange}
            value={values.ingredient}
            error={false}
          />
          <Select
            defaultValue={""}
            closeMenuOnSelect={true}
            options={categories}
            onChange={async (e) => {
              if (!!e) {
                setFieldValue("category", e);
              }
              console.log(e);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Ingredient
          </Button>
          <Grid container></Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
