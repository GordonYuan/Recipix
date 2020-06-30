import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Route,
  Link,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Notfound from "./components/notfound";
import Navbar from "./components/navbar";

const routing = (
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
ReactDOM.render(routing, document.getElementById("root"));
