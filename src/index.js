import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
