import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const Recipe = ({ match }) => {
  const recipeId = match.params.id;

  return (
    <Container component="main">
      <div>
        <Typography component="h1" variant="h5">
          Recipe Name
        </Typography>
        <Typography component="h1" variant="h5">
          By User:
        </Typography>
        <Typography component="h1" variant="h5">
          Recipe Instructions
        </Typography>
      </div>
    </Container>
  );
};

export default Recipe;
