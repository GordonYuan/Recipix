import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { withRouter } from "react-router";
import AddRecipeForm from "./AddRecipeForm";
import { HOME_PAGE, EDIT_RECIPE, ADD_RECIPE } from "../constants/urlConstants";
import * as Yup from "yup";
import getRecipeByIdApi from "../apis/getRecipeByIdApi";
import editRecipeApi from "../apis/editRecipeApi";
import createRecipeApi from "../apis/createRecipeApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { mapTagsObjectToArray } from "../utils/Mappers";

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

//This page is re-used depending on context. Adding a recipe can either be from scratch, from edit or from a request.
const AddRecipePage = ({ history, match }) => {
  const [recipe, setRecipe] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isRequest, setIsRequest] = useState(false);

  useEffect(() => {
    //If I'm editting a recipe, then I need to wait on the Api
    async function fetchRecipe() {
      const response = await getRecipeByIdApi({
        recipe_id: match.params.id.substr(1),
      });
      //Set recipe variable to have the recipe information
      setRecipe(response.data.recipes[0]);
      setIsLoaded(true);
    }
    //If I'm editting a recipe, then I need to wait on the
    //Else, If I'm just adding a recipe, then there is nothing to wait on so isLoaded = true
    if (match.path === EDIT_RECIPE) {
      setIsEdit(true);
      fetchRecipe();
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div align="center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          recipeName: recipe.recipe_name || "",
          image: recipe.image || "",
          tags: !!recipe.tags ? mapTagsObjectToArray(recipe.tags) : [],
          ingredients: recipe.ingredients || [{ name: "", quantity: "" }],
          servings: recipe.servings || "",
          instructions: recipe.method || [{ instruction: "" }],
          description: recipe.description || "",
        }}
        validationSchema={AddRecipeSchema}
        onSubmit={async (values) => {
          if (isEdit) {
            const response = await editRecipeApi(
              values,
              match.params.id.substr(1)
            );
            if (response.status === 200) {
              history.push(HOME_PAGE);
            }
          } else if (!isEdit) {
            const response = await createRecipeApi(values);
            if (response.status === 200) {
              history.push(HOME_PAGE);
            }
          }
        }}
      >
        {(props) => <AddRecipeForm {...props} />}
      </Formik>
      {/* {console.log({ return: recipe })} */}
      {/* {console.log(mapTags(recipe.tags))} */}
    </React.Fragment>
  );
};

export default withRouter(AddRecipePage);
