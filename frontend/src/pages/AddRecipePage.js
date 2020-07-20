import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

//TODO: Upload image and Tags, link to API, tags

const AddRecipePage = () => {
  //Functions needed to dynamically add instructions to the recipe
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

  // Functions needed to dynamically add ingredients to the recipe
  const [ingredientList, setIngredientList] = useState([{ ingredient: "" }]);

  const handleIngreChange = (e, idx) => {
    const { name, value } = e.target;

    const list = [...ingredientList];
    list[idx][name] = value;
    setIngredientList(list);
  };

  const handleAddIngredient = () => {
    const list = [...ingredientList];
    list.push({ ingredient: "" });
    setIngredientList(list);
  };

  const handleRemoveIngredient = (idx) => {
    const list = [...ingredientList];
    list.splice(idx, 1);
    setIngredientList(list);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Create Your Recipe
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="recipeName"
            name="recipeName"
            label="Recipe Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            height="100%"
            fullWidth
          />
        </Grid>
      </Grid>
      {/* This part focuses on dynamically adding ingredients needed for the recipe */}
      <br></br>
      <br></br>
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
                {ingredientList.length - 1 == idx && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddIngredient}
                  >
                    Add
                  </Button>
                )}
                {ingredientList.length != 1 && (
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
      {/* This part focuses on dynamically adding instructions needed for the recipe */}
      <br></br>
      <br></br>
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
                  id="input"
                  name="input"
                  value={item.instruction}
                  onChange={(e) => handleInstrChange(e, idx)}
                  style={{ width: "75%" }}
                />
                {instructionList.length - 1 == idx && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddInstruction}
                  >
                    Add
                  </Button>
                )}
                {instructionList.length != 1 && (
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
      <br></br>
      <br></br>
      <Button variant="contained" color="primary">
        Create Recipe
      </Button>
      {/* <pre>{JSON.stringify(instructionList, null, 1)}</pre> */}
      {/* <pre>{JSON.stringify(ingredientList, null, 1)}</pre> */}
    </React.Fragment>
  );
};

// return (
//   <React.Fragment>
//     <Typography variant="h6" gutterBottom>
//       Create Your Recipe
//     </Typography>
//     <Grid container spacing={3}>
//       <Grid item xs={12} sm={8}>
//         <TextField
//           required
//           id="recipeName"
//           name="recipeName"
//           label="Recipe Name"
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField
//           required
//           id="lastName"
//           name="lastName"
//           label="Image"
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           required
//           id="address1"
//           name="address1"
//           label="Description"
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField
//           required
//           id="ingredients"
//           name="ingredients"
//           label="Ingredients"
//           fullWidth
//         />
//       </Grid>
//       <pre>{JSON.stringify(instructionList, null, 1)}</pre>
//       {instructionList.map((x, i) => {
//         return (
//           <Grid item xs={12} key={i}>
//             <TextField
//               id="instructions"
//               name="instructions"
//               label="Instructions"
//               value={instructionList.instruction}
//               onChange={handleInstrChange}
//               fullWidth
//             />
//           </Grid>
//         );
//       })}
//       <Grid item xs={12}>
//         <TextField id="address2" name="address2" label="Tags" fullWidth />
//       </Grid>
//     </Grid>
//   </React.Fragment>
// );

export default AddRecipePage;
