import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AppContext } from "../libs/contextLib";

export default function Home() {
  return (
    <div className="Home">
      {!AppContext.isAuthenticated ? (
        <div className="lander">
          <h1>padelBooking</h1>
          <h2>Reserva tu pista de padel</h2>
          <Link to="/login">
            <Button className="mt-5" variant="outline-light">
              Iniciar sesión
            </Button>
          </Link>
          <div>
            <p>
              ¿No eres usuario?{" "}
              <Link to="signUp" style={{ color: "orange", display: "inline" }}>
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <p> logueado </p>
      )}
    </div>
  );
}
