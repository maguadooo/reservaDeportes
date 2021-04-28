import "./centroDeportivo.css";
import { useHistory } from "react-router-dom";

export default function CentroDeportivo(props) {
  const centro = props.centro;
  const deporte = props.deporte;
  const history = useHistory();

  function handleClick(event) {
    event.preventDefault();
    history.push("/reservar/" + deporte + "/" + centro.uniqueID);
  }

  return (
    <div class="tarjeta-centro-deportivo col-sm-4" onClick={handleClick}>
      <img
        class="card-img-top"
        alt={centro.nombreCentroDeportivo}
        src={centro.fotoPortada}
      />
      <div class="card-body">
        <h5 class="card-title">{centro.nombreCentroDeportivo}</h5>
        <p class="card-text">Distancia {centro.distanciaABusqueda} km</p>
      </div>
    </div>
  );
}
