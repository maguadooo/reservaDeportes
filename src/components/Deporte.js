import "./Deporte.css";
import { useHistory } from "react-router-dom";

export default function Deporte(props) {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push("/reservar/" + props.deporte)}
      className="tarjeta-deporte col-sm-4"
    >
      <h3>{props.deporte}</h3>
      <img alt={props.deporte} src={props.iconoDeporte} />
    </div>
  );
}
