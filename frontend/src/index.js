import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Notfound from "./components/notfound";
import Navbar from "./components/navbar";

const App = (
  <Router>
    <Navbar />
    <div>
      {/* Switch component helps us to render the components only when path matches otherwise it fallbacks to the not found component. */}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);
ReactDOM.render(App, document.getElementById("root"));
