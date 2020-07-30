import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { titleCase } from "../pages/HomePage";

const RecommendationChip = (props) => {
  const { ingredientsList, recommendations, setIngredients } = props;
  return (
    <Grid container spacing={2}>
      <Typography>Do you have?</Typography>
      {recommendations &&
        recommendations.map((ingredient) => (
          <Chip
            size="small"
            key={ingredient.name}
            label={titleCase(ingredient.name)}
            onClick={() => {
              // const copy = ingredientsList;
              // copy.push({
              //   value: ingredient.name,
              //   label: titleCase(ingredient.name),
              // });
              // setIngredients(copy);
              //console.log(ingredientsList);
              setIngredients((prevState) => [
                ...prevState,
                { value: ingredient.name, label: titleCase(ingredient.name) },
              ]);
            }}
          ></Chip>
        ))}
    </Grid>
  );
};

export default RecommendationChip;
