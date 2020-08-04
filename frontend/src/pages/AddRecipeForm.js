import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FileBase64 from "react-file-base64";
import TagFilter from "../components/TagFilter";
import IngredientSearchBar from "../components/IngredientSearchBar";
import getIngredientsApi from "../apis/getIngredientsApi";
import { mapToOptions } from "../utils/Mappers";

const AddRecipeForm = (props) => {
  const {
    handleSubmit,
    values,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    touched,
  } = props;

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredientsApi();
      setIngredients(mapToOptions(response.data.categories));
    }
    fetchIngredients();
  }, []);

  // Functional components needed to dynamically add ingredients to the recipe
  const handleIngreChange = (e, idx) => {
    const { name, value } = e.target;
    const list = [...values.ingredients];
    list[idx][name] = value;
    console.log({ list });
    setFieldValue("ingredients", list);
  };

  const handleSearchChange = (e, idx) => {
    const { value } = e;
    const list = [...values.ingredients];
    list[idx]["name"] = value;
    console.log({ list });
    setFieldValue("ingredients", list);
  };

  const handleAddIngredient = () => {
    const list = [...values.ingredients];
    list.push({ name: "", quantity: "" });
    setFieldValue("ingredients", list);
  };

  const handleRemoveIngredient = (idx) => {
    const list = [...values.ingredients];
    list.splice(idx, 1);
    setFieldValue("ingredients", list);
  };

  //Functional components needed to dynamically add instructions to the recipe

  const handleInstrChange = (e, idx) => {
    const { name, value } = e.target;

    const list = [...values.instructions];
    list[idx][name] = value;
    setFieldValue("instructions", list);
  };

  const handleAddInstruction = () => {
    const list = [...values.instructions];
    list.push({ step_number: "", instruction: "" });
    setFieldValue("instructions", list);
  };

  const handleRemoveInstruction = (idx) => {
    const list = [...values.instructions];
    list.splice(idx, 1);
    setFieldValue("instructions", list);
  };

  const getFiles = (files) => {
    if (files) {
      var regex = /[^,"]+$/;
      values.image = files.base64.match(regex)[0];
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Your Recipe
      </Typography>
      {/* {console.log({ recipeName: errors.recipeName })} */}
      {/* Recipe Name field */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="recipeName"
            name="recipeName"
            label="Recipe Name"
            onChange={handleChange}
            value={values.recipeName}
            error={touched.recipeName && Boolean(errors.recipeName)}
            helperText={touched.recipeName ? errors.recipeName : ""}
            onBlur={handleBlur}
            multiline
            fullWidth
          />
        </Grid>
        {/* Upload Image field */}
        <br />
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" gutterBottom>
            Upload an Image of your Recipe
          </Typography>
          <FileBase64 multiple={false} onDone={getFiles} />
        </Grid>
        {/* Description field */}
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            onChange={handleChange}
            value={values.description}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description ? errors.description : ""}
            onBlur={handleBlur}
            multiline
            fullWidth
          />
        </Grid>
        {/* Tags field */}
        <Grid item xs={12} sm={12}>
          <TagFilter
            tagsState={values.tags}
            setTagsState={(tags) => setFieldValue("tags", tags)}
          />
        </Grid>
        {/* Servings field */}
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="servings"
            name="servings"
            label="Servings"
            onChange={handleChange}
            value={values.servings}
            error={touched.servings && Boolean(errors.servings)}
            helperText={touched.servings ? errors.servings : ""}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" style={{ paddingTop: "30px" }} gutterBottom>
        Ingredients
      </Typography>

      {values.ingredients.map((item, idx) => {
        return (
          <Grid container spacing={4} key={idx}>
            <Grid item xs={6} style={{ paddingTop: "24px" }}>
              <IngredientSearchBar
                isMulti={false}
                closeMenuOnSelect={true}
                options={ingredients}
                placeholder={"Enter your ingredient..."}
                onChange={(e) => handleSearchChange(e, idx)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="quantity"
                name="quantity"
                label="Quantity..."
                value={item.quantity}
                onChange={(e) => handleIngreChange(e, idx)}
              />
            </Grid>
            {values.ingredients.length !== 1 && (
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => handleRemoveIngredient(idx)}
              >
                <DeleteIcon />
              </IconButton>
            )}
            {values.ingredients.length - 1 === idx && (
              <IconButton
                aria-label="add"
                color="primary"
                onClick={() => handleAddIngredient()}
              >
                <AddCircleIcon />
              </IconButton>
            )}
          </Grid>
        );
      })}

      <Typography variant="h5" style={{ paddingTop: "30px" }} gutterBottom>
        Instructions
      </Typography>
      <Grid container spacing={4}>
        {values.instructions.map((item, idx) => {
          return (
            <Grid item xs={12} key={idx}>
              Step {idx + 1}
              <div>
                <TextField
                  required
                  id="instruction"
                  name="instruction"
                  label="Enter your instruction..."
                  value={item.instruction}
                  onChange={(e) => handleInstrChange(e, idx)}
                  style={{ width: "75%" }}
                />
                {values.instructions.length !== 1 && (
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => handleRemoveInstruction(idx)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                {values.instructions.length - 1 === idx && (
                  <IconButton
                    aria-label="add"
                    color="primary"
                    onClick={() => handleAddInstruction()}
                  >
                    <AddCircleIcon />
                  </IconButton>
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Recipe
      </Button>
      {/* <pre>{JSON.stringify(values.recipeName, null, 1)}</pre>
      <pre>{JSON.stringify(values.description, null, 1)}</pre>
      <pre>{JSON.stringify(values.servings, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(values.ingredients, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(values.ingredients, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(instructionList, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(values.instructions, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(recipeName, null, 1)}</pre>  */}
    </>
  );
};

export default AddRecipeForm;
