import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import getIngredientsApi from "../apis/getIngredientsApi";
import RecipeCard from "../components/RecipeCard";
import searchRecipesApi from "../apis/searchRecipesApi";

//Functional components needed to dynamically add instructions to the recipe
//   const [instructionList, setInstructionList] = useState([{ instruction: "" }]);
//   const handleInstrChange = (e, idx) => {
//     const { name, value } = e.target;

//     const list = [...instructionList];
//     list[idx][name] = value;
//     setInstructionList(list);
//   };

//   const handleAddInstruction = () => {
//     const list = [...instructionList];
//     list.push({ instruction: "" });
//     setInstructionList(list);
//   };

//   const handleRemoveInstruction = (idx) => {
//     const list = [...instructionList];
//     list.splice(idx, 1);
//     setInstructionList(list);
//   };

//   // Functional components needed to dynamically add ingredients to the recipe
//   const [ingredientList, setIngredientList] = useState([{ ingredient: "" }]);
//   const handleIngreChange = (e, idx) => {
//     const { name, value } = e.target;

//     const list = [...ingredientList];
//     list[idx][name] = value;
//     setIngredientList(list);
//   };

//   const handleAddIngredient = () => {
//     const list = [...ingredientList];
//     list.push({ ingredient: "" });
//     setIngredientList(list);
//   };

//   const handleRemoveIngredient = (idx) => {
//     const list = [...ingredientList];
//     list.splice(idx, 1);
//     setIngredientList(list);
//   };

//   const handleImgUpload = (e) => {
//     console.log(e.target.files[0]);
//   };

//   // Submitting the recipe
//   const [recipeName, setRecipeName] = useState({ recipeName: "" });
//   const submitRecipe = () => {};

const AddRecipeForm = (props) => {
  const { handleChange, handleSubmit, values } = props;

  // Functional components needed to dynamically add ingredients to the recipe
  const [ingredientList, setIngredientList] = useState([
    { ingredient: "", quantity: "" },
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
    list.push({ ingredient: "", quantity: "" });
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
  const [instructionList, setInstructionList] = useState([{ instruction: "" }]);
  const handleInstrChange = (e, idx) => {
    const { name, value } = e.target;

    const list = [...instructionList];
    list[idx][name] = value;
    setInstructionList(list);
  };

  const handleAddInstruction = () => {
    const list = [...instructionList];
    list.push({ instruction: "" });
    setInstructionList(list);
  };

  const handleRemoveInstruction = (idx) => {
    const list = [...instructionList];
    list.splice(idx, 1);
    setInstructionList(list);
  };

  //Get all ingredients
  //   const [ingredientOptions, setIngredientOptions] = useState([]);

  //   useEffect(() => {
  //     async function fetchIngredients() {
  //       const response = await getIngredientsApi();
  //       setIngredientOptions(response.data.categories);
  //     }
  //     fetchIngredients();
  //   }, []);

  return (
    <React.Fragment>
      {/* Resources for the upload image component of recipe creation */}
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      <Typography variant="h4" gutterBottom>
        Create Your Recipe
      </Typography>
      {/* Recipe Name field */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="recipeName"
            name="recipeName"
            label="Recipe Name"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {/* Upload Image field */}
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form method="post" action="#" id="#">
                <div className="form-group files">
                  <label>Picture of Your Recipe </label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    multiple=""
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Description field */}
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        {/* Servings field */}
        <Grid item xs={12} sm={12}>
          <TextField
            id="servings"
            name="servings"
            label="Servings"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom>
        Ingredients
      </Typography>
      <Grid container spacing={4}>
        {ingredientList.map((item, idx) => {
          return (
            <Grid item xs={12}>
              <div key={idx}>
                <TextField
                  id="ingredient"
                  name="ingredient"
                  value={item.ingredient}
                  onChange={(e) => handleIngreChange(e, idx)}
                  style={{ width: "50%" }}
                />
                <TextField
                  id="quantity"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleIngreChange(e, idx)}
                  style={{ width: "50%" }}
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
      <Typography variant="h5" gutterBottom>
        Instructions
      </Typography>
      <Grid container spacing={4}>
        {instructionList.map((item, idx) => {
          return (
            <Grid item xs={12}>
              <div key={idx}>
                Step {idx + 1}
                <TextField
                  id="instruction"
                  name="instruction"
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
      <Button variant="contained" color="primary">
        Create Recipe
      </Button>
      <pre>{JSON.stringify(values.recipeName, null, 1)}</pre>
      <pre>{JSON.stringify(values.description, null, 1)}</pre>
      {/* <pre>{JSON.stringify(instructionList, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(ingredientList, null, 1)}</pre> */}
      <pre>{JSON.stringify(values.ingredients, null, 1)}</pre>
      {/* <pre>{JSON.stringify(recipeName, null, 1)}</pre>  */}
    </React.Fragment>
  );
};

export default AddRecipeForm;

//   {/* This part focuses on dynamically adding ingredients needed for the recipe */}
//   <br></br>
//   <br></br>
//   <Typography variant="h5" gutterBottom>
//     Ingredients
//   </Typography>
//   {/* <Grid container spacing={4}>
//     {ingredientList.map((item, idx) => {
//       return (
//         <Grid item xs={12}>
//           <div key={idx}>
//             <TextField
//               id="ingredient"
//               name="ingredient"
//               //   value={item.ingredient}
//               //   onChange={(e) => handleIngreChange(e, idx)}
//               style={{ width: "50%" }}
//             />
//             {ingredientList.length - 1 === idx && (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddIngredient}
//               >
//                 Add
//               </Button>
//             )}
//             {ingredientList.length !== 1 && (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 // onClick={() => handleRemoveIngredient(idx)}
//               >
//                 Remove
//               </Button>
//             )}
//           </div>
//         </Grid>
//       );
//     })}
//   </Grid> */}
//   {/* This part focuses on dynamically adding instructions needed for the recipe */}
//   <br></br>
//   <br></br>
//   {/* <Typography variant="h5" gutterBottom>
//     Instructions
//   </Typography>
//   <Grid container spacing={4}>
//     {instructionList.map((item, idx) => {
//       return (
//         <Grid item xs={12}>
//           <div key={idx}>
//             Step {idx + 1}
//             <TextField
//               id="instruction"
//               name="instruction"
//               //   value={item.instruction}
//               //   onChange={(e) => handleInstrChange(e, idx)}
//               style={{ width: "75%" }}
//             />
//             {instructionList.length - 1 === idx && (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 // onClick={handleAddInstruction}
//               >
//                 Add
//               </Button>
//             )}
//             {instructionList.length !== 1 && (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 // onClick={() => handleRemoveInstruction(idx)}
//               >
//                 Remove
//               </Button>
//             )}
//           </div>
//         </Grid>
//       );
//     })}
//   </Grid>
//   <br></br>
//   <br></br> */}
//   {/* Need to work on this and connect it to API */}
