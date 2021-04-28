import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import Deporte from "../components/Deporte";
import iconoPadel from "../assets/img/iconosDeportes/padel.png";
import iconoFutbol from "../assets/img/iconosDeportes/futbol.png";

import iconoFutbolSala from "../assets/img/iconosDeportes/futbolSala.jpg";

export default function Home() {
  const { isAuthenticated } = useAppContext();

  function renderLanding() {
    return (
      <div className="landing">
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
    );
  }

  function renderHomeLogueado() {
    return (
      <div className="Deportes">
        <h1>Deportes</h1>
        <h5>Escoge el deporte para el que quieres reservar</h5>
        <Container className="listadoDeportes">
          <div className="row">
            <Deporte deporte="Pádel" iconoDeporte={iconoPadel} />
            <Deporte deporte="Fútbol 7" iconoDeporte={iconoFutbol} />
            <Deporte deporte="Fútbol 11" iconoDeporte={iconoFutbol} />
          </div>
          <div className="row">
            <Deporte deporte="Fútbol Sala" iconoDeporte={iconoFutbolSala} />
            <Deporte deporte="Tenis" iconoDeporte={iconoPadel} />
            <div className="col-sm"></div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderHomeLogueado() : renderLanding()}
    </div>
  );
}
