import "./ListadoCentros.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const [fields, setFields] = useState({
    direccion: "",
  });

  const handleFieldChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

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
    });
  }, []);

  function handleSubmitAddress(event) {
    event.preventDefault();
    setDireccionResultados("Buscando...");
    coordenadas(fields.direccion).then((value) => {
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
      direccionResultados !== "" &&
      direccionResultados !== "Buscando..." &&
      direccionResultados !== "No se ha encontrado"
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
      if (tarjetas.length > 0) return tarjetas;
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
      <form
        className="direccion"
        autoComplete="off"
        onSubmit={(e) => {
          handleSubmitAddress(e);
        }}
      >
        <div className="row">
          <label className="col-sm-3 col-md-2 col-form-label">Dirección</label>
          <div className="col-sm-5">
            <input
              autoFocus
              className="form-control"
              placeholder="Dirección"
              name="direccion"
              onChange={handleFieldChange}
            ></input>
          </div>
          <label className="col-sm-4">{direccionResultados}</label>
        </div>
        <div className="row">
          <button className="col-sm-2 mt-5 btn btn-warning" type="submit">
            Buscar
          </button>
        </div>

        {direccionResultados !== "" &&
          direccionResultados !== "Buscando..." &&
          direccionResultados !== "No se ha encontrado" && (
            <div className="row mt-5">
              <label className="col-md-3 col-sm-4 ">
                Radio de busqueda: {radio} km
              </label>
              <input
                className="col-sm-6"
                min="1"
                max="50"
                defaultValue="10"
                type="range"
                onChange={(event) => {
                  setRadio(event.target.value);
                }}
              />
            </div>
          )}
      </form>
      {direccionResultados && <h2 className="mt-4">Resultados</h2>}
      <div className="row">{renderCentros(listadoCentros)}</div>
    </div>
  );
}
