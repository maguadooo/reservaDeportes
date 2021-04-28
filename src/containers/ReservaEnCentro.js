import React, { useState } from "react";
import "./ReservaEnCentro.css";
import { useParams } from "react-router-dom";
// import { API } from "aws-amplify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservaEnCentro() {
  //let { uniqueID } = useParams();
  let uniqueID = 2;
  let { deporte } = useParams();
  const [nombreCentro, setNombreCentro] = useState("");
  // const [isLoading, setIsLoading] = useState("true");
  const [startDate, setStartDate] = useState(new Date());

  const init = {
    body: { content: { uniqueID: uniqueID } },
  };

  //API.post("prod-reservaDeportes-api", "obtenerCentro", init).then((value) => {
  //setNombreCentro(value.nombreCentroDeportivo);
  // setIsLoading(false);
  //});
  setNombreCentro("");
  console.log(startDate);
  console.log(init);

  function renderWeek() {
    return (
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>{startDate.getDate()}</th>
            <th>Hola</th>
            <th>Hola</th>
          </tr>
          <tr>
            <th>Hola</th>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    //!isLoading && (
    <div>
      <h1>{nombreCentro}</h1>
      <h2>{deporte}</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />

      {renderWeek()}
    </div>
  );
}
