import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

// useEffects -> runs a function when the page loads
// -> calling the api for all recipes and ingredients
// -> populate the search bar
// -> when searching, it will filter for recipes

const RecipeCard = (props) => {
  const { title, imagePath, recipeId } = props;
  console.log(imagePath);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          style={{ height: 150 }}
          className={classes.media}
          image={"data:image/png;base64," + imagePath}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={"/recipe/:" + recipeId} variant="body2">
          {"View Recipe"}
        </Link>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
