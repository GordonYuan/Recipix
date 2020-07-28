import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { ADD_RECIPE } from "../constants/urlConstants";

// clicking the request card populates add reccipe page with ingredients?

const RequestCard = (props) => {
  const { ingredients, count } = props;

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6">
          Ingredients
        </Typography>
        <Typography gutterBottom variant="body1">
          <ul>
            {ingredients.map((ingredient) => {
              return <li>{ingredient.name}</li>;
            })}
          </ul>
        </Typography>
        <Typography gutterBottom variant="body1">
          Times Requested: {count}
        </Typography>
        <Link href={ADD_RECIPE} variant="body2">
          {"Create Recipe"}
        </Link>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
