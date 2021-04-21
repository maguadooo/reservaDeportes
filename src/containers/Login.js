import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { onError } from "../libs/errorLib";
import { Auth } from "aws-amplify";
import "./Login.css";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";

export default function Login(email) {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // eslint-disable-next-line
      const user = await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      if (e.code === "UserNotConfirmedException") {
        try {
          Auth.resendSignUp(fields.email);
          history.push("/userConfirm/" + fields.email);
        } catch (e) {
          onError(e);
          setIsLoading(false);
        }
      } else {
        onError(e);
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          variant="warning"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Iniciar sesión
        </LoaderButton>
      </Form>
    </div>
  );
}
