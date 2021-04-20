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
    <li onClick={handleClick}>
      <img src={centro.fotoPortada}></img>
      <h5 className="nombreCentroDeportivo">{centro.nombreCentroDeportivo}</h5>
      <p>Distancia {centro.distanciaABusqueda} km</p>
    </li>
  );
}
