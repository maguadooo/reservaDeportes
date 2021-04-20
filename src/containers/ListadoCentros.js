import "./ListadoCentros.css";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import react, { useState, useEffect } from "react";
import { onError } from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";
import { useFormFields } from "../libs/hooksLib";
import {
  coordenadas,
  buscarDireccion,
  distanciaCoordenadas,
} from "../libs/geoCode";
import CentroDeportivo from "../components/centroDeportivo";

export default function Deporte(props) {
  let { deporte } = useParams();
  const [radio, setRadio] = useState(10);
  const [direccionResultados, setDireccionResultados] = useState("");
  const [listadoCentros, setlistadoCentros] = useState([]);
  const [coordenadasBusqueda, setcoordenadasBusqueda] = useState({
    lat: 0,
    lon: 0,
  });
  const [centrosDeportivos, setCentrosDeportivos] = useState([{}]);

  const [fields, handleFieldChange] = useFormFields({
    direccion: "",
  });

  async function loadCentros() {
    //try {
    //API.get("prod-reservaDeportes-api", "centros").then((value) =>        console.log(value));

    var promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        let centros = [
          {
            coordenadas: "43.36127905970945, -5.873854201507034",
            deportes: ["Pádel", "Tenis"],
            direccion: {
              localidad: "Oviedo",
              codigoPostal: "33013",
              provincia: "Asturias",
              calle: "Calle Antón Sanchez s/n",
            },
            fotoPortada:
              "https://reservadeportes.s3.amazonaws.com/dev/media/centrosDeportivos/135456ds5342-fsdfds31_Pistas+de+Tenis+y+P%C3%A1del+del+Parque+del+Oeste/fotoPortada.jpg",
            nombreCentroDeportivo:
              "Pistas de Tenis y Pádel del Parque del Oeste",
            telefono: "+34985273721",
            uniqueID: "135456ds5342-fsdfds31",
            vestuarios: true,
          },
          {
            coordenadas: "43.3975570236998, -5.815577055830056",
            deportes: ["Pádel"],
            direccion: {
              localidad: "Lugones",
              codigoPostal: "33420",
              provincia: "Asturias",
              calle: "Polígono Peñones, 11",
            },
            fotoPortada:
              "https://reservadeportes.s3.amazonaws.com/dev/media/centrosDeportivos/135456ds5342-456fd54s6fd_Drive+P%C3%A1del/fotoPortada.jpg",
            nombreCentroDeportivo: "Drive Pádel",
            telefono: "+34985267977",
            uniqueID: "135456ds5342-456fd54s6fd",
            vestuarios: true,
          },
        ];

        resolve(centros);
      }, 1500);
    });
    return promise;
    // } catch (e) {
    //   onError(e);
    // }
    // }
  }

  useEffect(() => {
    loadCentros().then((value) => {
      setlistadoCentros(value);
      console.log(listadoCentros);
    });
  }, []);

  function handleSubmitAddress(event) {
    event.preventDefault();
    setDireccionResultados("Buscando...");
    coordenadas(fields.direccion).then((value) => {
      setcoordenadasBusqueda(value);
      if (value != null) {
        for (let i in listadoCentros) {
          listadoCentros[i].distanciaABusqueda = distanciaCoordenadas(
            value,
            listadoCentros[i].coordenadas
          );
        }
      }
      listadoCentros.sort(function (a, b) {
        return a.distanciaABusqueda - b.distanciaABusqueda;
      });
    });
    buscarDireccion(fields.direccion).then((value) =>
      setDireccionResultados(value)
    );
  }

  function renderCentros(centros) {
    if (
      direccionResultados != "" &&
      direccionResultados != "Buscando..." &&
      direccionResultados != "No se ha encontrado"
    ) {
      let tarjetas = [];
      for (let i in centros) {
        if (centros[i].deportes.indexOf(deporte) > -1) {
          if (centros[i].distanciaABusqueda <= radio)
            tarjetas.push(
              <CentroDeportivo deporte={deporte} centro={centros[i]} />
            );
        }
      }
      if (tarjetas.length > 0) return <ul>{tarjetas}</ul>;
      else
        return (
          <p>
            No se han encontrado resultados. Prueba con otra ubicación o aumenta
            el radio de búsqueda
          </p>
        );
    } else {
      return null;
    }
  }

  return (
    <div>
      <h1>Localizaciones</h1>
      <h2>{deporte}</h2>
      <Form
        className="direccion"
        autoComplete="off"
        onSubmit={handleSubmitAddress}
      >
        <Row>
          <Form.Group as={Row} controlId="direccion">
            <Form.Label column sm={2}>
              Dirección
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                autoFocus
                placeholder="Introducir dirección"
                value={fields.direccion}
                onChange={(e) => {
                  handleFieldChange(e);
                }}
              />
            </Col>
            <Form.Label column sm={6}>
              {direccionResultados}
            </Form.Label>
          </Form.Group>
        </Row>
        <Row>
          <Button variant="warning" type="submit" text="hola">
            Buscar
          </Button>
        </Row>
        <Row>
          <Col sm={6}>
            {direccionResultados != "" &&
              direccionResultados != "Buscando..." &&
              direccionResultados != "No se ha encontrado" && (
                <Form.Group className="rangoBusqueda">
                  <Form.Label>Radio de busqueda: {radio} km</Form.Label>
                  <Form.Control
                    min="1"
                    max="50"
                    defaultValue="10"
                    type="range"
                    onChange={(event) => {
                      setRadio(event.target.value);
                    }}
                  />
                </Form.Group>
              )}
          </Col>
        </Row>
      </Form>
      {direccionResultados && <h2>Resultados</h2>}
      {renderCentros(listadoCentros)}
    </div>
  );
}
