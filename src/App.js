import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import Routes from "./Routes";
import "./App.css";
import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";

export default function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const user = await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/");
  }

  return (
    !isAuthenticating && (
      <div className="App Container py-3">
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
                to="/"
                className="justify-content-end"
                onClick={handleLogout}
              >
                <Navbar.Collapse className="justify-content-end">
                  <Button variant="warning">Cerrar sesión</Button>
                </Navbar.Collapse>
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
    )
  );
}
