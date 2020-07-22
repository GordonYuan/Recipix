import React from "react";

const ItemList = (list) => {
  return (
    <>
      <Grid container spacing={4}>
        {ingredientList.map((item, idx) => {
          return (
            <Grid item xs={12}>
              <div key={idx}>
                <TextField
                  id="ingredient"
                  name="ingredient"
                  //   value={item.ingredient}
                  //   onChange={(e) => handleIngreChange(e, idx)}
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
                    // onClick={() => handleRemoveIngredient(idx)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
