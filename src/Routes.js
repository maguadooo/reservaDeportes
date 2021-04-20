import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import UserConfirm from "./containers/userConfirm";
import ListadoCentros from "./containers/ListadoCentros";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ReservaEnCentro from "./containers/ReservaEnCentro";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signUp">
        <Signup />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute path="/userConfirm/:userEmail">
        <UserConfirm />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/reservar/:deporte">
        <ListadoCentros />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/reservar/:deporte/:uniqueID">
        <ReservaEnCentro />
      </AuthenticatedRoute>

      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
