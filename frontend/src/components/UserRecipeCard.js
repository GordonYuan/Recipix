import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";
import deleteRecipeApi from "../apis/deleteRecipeApi";

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

const UserRecipeCard = (props) => {
  const { title, imagePath, recipeId } = props;
  //console.log(imagePath);
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
      <Grid container spacing={2}>
        <CardActions>
          <Grid xs={4}>
            <Link href={"/recipe/:" + recipeId} variant="body2">
              {"View Recipe"}
            </Link>
          </Grid>
          <Grid xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="text"
              color="primary"
              onClick={() => {
                //
              }}
            >
              {"Edit Recipe"}
            </Button>
          </Grid>
          <Grid xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="text"
              color="secondary"
              onClick={async () => {
                //console.log({ recipe_id: recipeId });
                deleteRecipeApi({ recipe_id: recipeId });
                window.location.reload();
              }}
            >
              {"Delete Recipe"}
            </Button>
          </Grid>
        </CardActions>
      </Grid>
    </Card>
  );
};

export default withRouter(UserRecipeCard);
