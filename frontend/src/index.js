import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Route,
  Link,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import App from "./App";
import Users from "./components/users";
import Contact from "./components/contact";
import Notfound from "./components/notfound";
import Navbar from "./components/navbar";

const routing = (
  <Router>
    <Navbar />
    <div>
      <ul>
        <li>
          <NavLink activeClassName="active" to="/users">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/contact">
            Contact
          </NavLink>
        </li>
      </ul>
      {/* Switch component helps us to render the components only when path matches otherwise it fallbacks to the not found component. */}
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/users" component={Users} />
        <Route path="/contact" component={Contact} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
