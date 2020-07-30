import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { titleCase } from "../pages/HomePage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const RecommendationChip = (props) => {
  const classes = useStyles();
  const { ingredientsList, recommendations, setIngredients } = props;
  return (
    <div className={classes.root}>
      {recommendations.length !== 0 && <Typography>Do you have?</Typography>}
      {recommendations.length !== 0 &&
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
    </div>
  );
};

export default RecommendationChip;
