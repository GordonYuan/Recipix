import React, { useState } from "react";
import { TextField } from "@material-ui/core";

const RecipeSearchPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e, idx) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(input);
    }
  };

  return (
    <div>
      <p>Recipe Search Page</p>
      <React.Fragment>
        <TextField
          id="recipeSearch"
          name="recipeSearch"
          placeholder="Search for a Recipe..."
          variant="outlined"
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </React.Fragment>
    </div>
  );
};

export default RecipeSearchPage;
