import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";
import "./App.css";
import { AppContext } from "./libs/contextLib";

export default function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
    <div className="App Container py-3">
      <div className="bg-image"></div>
      <div className="navigation">
        <Navbar collapseOnSelect bg="dark" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              padelBooking
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />

          {isAuthenticated ? (
            <LinkContainer
              className="justify-content-end"
              onClick={handleLogout}
            >
              <Button variant="warning">Cerrar sesión</Button>
            </LinkContainer>
          ) : (
            <Navbar.Collapse className="justify-content-end">
              <LinkContainer to="/login">
                <Button variant="outline-light">Iniciar sesión</Button>
              </LinkContainer>
              <LinkContainer to="/signUp">
                <Button variant="outline-light" className="ml-2">
                  Crear cuenta
                </Button>
              </LinkContainer>
            </Navbar.Collapse>
          )}
        </Navbar>
      </div>

      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}
