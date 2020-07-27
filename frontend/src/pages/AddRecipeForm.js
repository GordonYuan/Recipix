import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FileBase64 from "react-file-base64";
import { FieldArray, Field } from "formik";

const AddRecipeForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    handleBlur,
  } = props;

  //   const tags = [
  //     { id: 1, name: "Apples" },
  //     { id: 2, name: "Pears" },
  //   ];

  //   const suggestions = [
  //     { id: 3, name: "Bananas" },
  //     { id: 4, name: "Mangos" },
  //     { id: 5, name: "Lemons" },
  //     { id: 6, name: "Apricots" },
  //   ];

  // Functional components needed to dynamically add ingredients to the recipe
  const [ingredientList, setIngredientList] = useState([
    { name: "", quantity: "" },
  ]);
  const handleIngreChange = (e, idx) => {
    const { name, value } = e.target;
    const list = [...ingredientList];
    list[idx][name] = value;
    setIngredientList(list);
    values.ingredients = ingredientList;
  };

  const handleAddIngredient = () => {
    const list = [...ingredientList];
    list.push({ name: "", quantity: "" });
    setIngredientList(list);
    values.ingredients = ingredientList;
  };

  const handleRemoveIngredient = (idx) => {
    const list = [...ingredientList];
    list.splice(idx, 1);
    setIngredientList(list);
    values.ingredients = ingredientList;
  };

  //Functional components needed to dynamically add instructions to the recipe
  const [instructionList, setInstructionList] = useState([
    { step_number: "", instruction: "" },
  ]);
  const handleInstrChange = (e, idx) => {
    const { name, value } = e.target;

    const list = [...instructionList];
    list[idx][name] = value;
    setInstructionList(list);
    instructionList[idx].step_number = idx + 1;
    values.instructions = instructionList;
  };

  const handleAddInstruction = () => {
    const list = [...instructionList];
    list.push({ step_number: "", instruction: "" });
    setInstructionList(list);
    values.instructions = instructionList;
  };

  const handleRemoveInstruction = (idx) => {
    const list = [...instructionList];
    list.splice(idx, 1);
    setInstructionList(list);
    values.instructions = instructionList;
  };

  const getFiles = (files) => {
    if (files) {
      var regex = /[^,"]+$/;
      values.image = files.base64.match(regex)[0];
    }
    console.log(values.image);
    // console.log(files.base64);
  };

  return (
    <React.Fragment>
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
            value={values.recipeName}
            error={touched.recipeName && Boolean(errors.recipeName)}
            helperText={touched.recipeName ? errors.recipeName : ""}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </Grid>
        {/* Upload Image field */}
        <br />
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom>
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
            value={values.description}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description ? errors.description : ""}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </Grid>
        {/* Servings field */}
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="servings"
            name="servings"
            label="Servings"
            value={values.servings}
            error={touched.servings && Boolean(errors.servings)}
            helperText={touched.servings ? errors.servings : ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
      <br />
      <Typography variant="h5" gutterBottom>
        Ingredients
      </Typography>
      {/* <FieldArray
        name="ingredients"
        render={(arrayHelpers) => (
          <div>
            {values.ingredients && values.ingredients.length > 0 ? (
              values.ingredients.map((ingredient, index) => (
                <div key={index}>
                  {/* <TextField
                    required
                    id="ingredient"
                    name={`ingredients.${index}.name`}
                    label="Type in your ingredient..."
                    style={{ width: "50%" }}
                  />
                  <TextField
                    required
                    id="quantity"
                    name={`ingredients.${index}.quantity`}
                    label="Quantity..."
                    style={{ width: "25%", marginLeft: "1rem" }}
                  /> 
                  <Field name={`ingredients.${index}.name`} />
                  <TextField
                    required
                    id="ingredient"
                    name="name"
                    value={
                      !!values.ingredients[index].name
                        ? values.ingredients[index].name
                        : ""
                    }
                    label="Type in your ingredient..."
                    style={{ width: "50%" }}
                  />
                  <Field name={`ingredients.${index}.quantity`} />
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                  >
                    Add
                  </button>
                </div>
              ))
            ) : (
              <button type="button" onClick={() => arrayHelpers.push("")}>
                Add an Ingredient
              </button>
            )}
          </div>
        )}
      /> */}
      <Grid container spacing={4}>
        {ingredientList.map((item, idx) => {
          return (
            <Grid item xs={12}>
              <div key={idx}>
                <TextField
                  required
                  id="ingredient"
                  name="name"
                  label="Type in your ingredient..."
                  value={item.ingredient}
                  onChange={(e) => handleIngreChange(e, idx)}
                  style={{ width: "50%" }}
                />
                <TextField
                  required
                  id="quantity"
                  name="quantity"
                  label="Quantity..."
                  value={item.quantity}
                  onChange={(e) => handleIngreChange(e, idx)}
                  style={{ width: "25%", marginLeft: "1rem" }}
                />
                {ingredientList.length - 1 === idx && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddIngredient}
                  >
                    Add
                  </Button>
                )}
                {ingredientList.length !== 1 && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveIngredient(idx)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
      <br />
      <Typography variant="h5" gutterBottom>
        Instructions
      </Typography>
      <Grid container spacing={4}>
        {instructionList.map((item, idx) => {
          return (
            <Grid item xs={12}>
              Step {idx + 1}
              <div key={idx}>
                <TextField
                  required
                  id="instruction"
                  name="instruction"
                  label="Type in your instruction..."
                  value={item.instruction}
                  onChange={(e) => handleInstrChange(e, idx)}
                  style={{ width: "75%" }}
                />
                {instructionList.length - 1 === idx && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddInstruction}
                  >
                    Add
                  </Button>
                )}
                {instructionList.length !== 1 && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveInstruction(idx)}
                  >
                    Remove
                  </Button>
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
      {/* <pre>{JSON.stringify(instructionList, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(ingredientList, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(values.ingredients, null, 1)}</pre>
      <pre>{JSON.stringify(values.instructions, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(recipeName, null, 1)}</pre>  */}
    </React.Fragment>
  );
};

export default AddRecipeForm;
