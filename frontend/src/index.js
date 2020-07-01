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
import AddRecipePage from "./pages/AddRecipePage";
import LoginPage from "./pages/LoginPage";
import Recipe from "./pages/Recipe";

const App = (
  <Router>
    <Navbar />
    <CentreColumn>
      {/* Switch component helps us to render the components only when path matches otherwise it fallbacks to the not found component. */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/recipe-search" component={RecipeSearchPage} />
        <Route exact path="/add-recipe" component={AddRecipePage} />
        <Route exact path="/my-recipes" component={MyRecipesPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/recipe/:id" component={Recipe} />
        <Route component={Notfound} />
      </Switch>
    </CentreColumn>
  </Router>
);
ReactDOM.render(App, document.getElementById("root"));
