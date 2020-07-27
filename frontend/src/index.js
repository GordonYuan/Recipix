import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Notfound from "./components/Notfound";
import Navbar from "./components/Navbar";
import CentreColumn from "./components/CentreColumn";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import MyRecipesPage from "./pages/MyRecipesPage";
import AddRecipePage from "./pages/AddRecipePageFormik";
import LoginPage from "./pages/LoginPage";
import Recipe from "./pages/Recipe";
import SignUpPage from "./pages/SignUpPage";
import AddIngredientPage from "./pages/AddIngredientPage";
import {
  HOME_PAGE,
  RECIPE_SEARCH,
  ADD_RECIPE,
  MY_RECIPES,
  LOGIN,
  SIGNUP,
  RECIPE_PAGE,
  ADD_INGREDIENT,
} from "./constants/urlConstants";

const App = (
  <Router>
    <Navbar />
    <CentreColumn>
      {/* Switch component helps us to render the components only when path matches otherwise it fallbacks to the not found component. */}
      <Switch>
        <Route exact path={HOME_PAGE} component={HomePage} />
        <Route exact path={RECIPE_SEARCH} component={RecipeSearchPage} />
        <Route exact path={ADD_RECIPE} component={AddRecipePage} />
        <Route exact path={MY_RECIPES} component={MyRecipesPage} />
        <Route exact path={LOGIN} component={LoginPage} />
        <Route exact path={SIGNUP} component={SignUpPage} />
        <Route exact path={RECIPE_PAGE} component={Recipe} />
        <Route exact path={ADD_INGREDIENT} component={AddIngredientPage} />
        <Route component={Notfound} />
      </Switch>
    </CentreColumn>
  </Router>
);
ReactDOM.render(App, document.getElementById("root"));
