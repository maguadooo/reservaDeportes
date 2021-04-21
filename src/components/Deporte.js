import "./Deporte.css";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Deporte(props) {
  const history = useHistory();
  return (
    <Col sm>
      <div
        onClick={() => history.push("/reservar/" + props.deporte)}
        className="tarjeta"
      >
        <h3>{props.deporte}</h3>
        <img alt={props.deporte} src={props.iconoDeporte} />
      </div>
    </Col>
  );
}
