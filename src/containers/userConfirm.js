import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./userConfirm.css";
import { Auth } from "aws-amplify";

export default function UserConfirm() {
  console.log(useParams());
  let { userEmail } = useParams();
  console.log(userEmail);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  // eslint-disable-next-line
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }
  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(userEmail, fields.confirmationCode);
      history.push("/login");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  return (
    <div className="userConfirm">
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Código de confirmación</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text>
            El usuario introducido no está verificado. Se ha enviado un nuevo
            código de verificación a {userEmail}. Por favor, comprueba el código
            de confirmación en tu email
          </Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Confirmar
        </LoaderButton>
      </Form>
    </div>
  );
}
