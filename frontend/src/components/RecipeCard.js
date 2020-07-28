import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import deleteRecipeApi from "../apis/deleteRecipeApi";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

// useEffects -> runs a function when the page loads
// -> calling the api for all recipes and ingredients
// -> populate the search bar
// -> when searching, it will filter for recipes

const RecipeCard = (props) => {
  const { title, imagePath, recipeId, canEdit } = props;
  // console.log(imagePath);
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
      <CardActions disableSpacing>
        <Link href={"/recipe/:" + recipeId} variant="body2">
          {"View Recipe"}
        </Link>
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          justify="flex-end"
          direction="row"
        >
          <Grid item>
            {canEdit && (
              <IconButton
                type="submit"
                variant="text"
                color="primary"
                aria-label="edit"
                size="small"
                onClick={() => {
                  //
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {canEdit && (
              <IconButton
                type="submit"
                variant="text"
                color="secondary"
                onClick={async () => {
                  //console.log({ recipe_id: recipeId });
                  await deleteRecipeApi({ recipe_id: recipeId });
                  window.location.reload();
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
