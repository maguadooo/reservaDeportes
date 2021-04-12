import React from "react";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            formFields={[
              {
                type: "email",
                label: "Custom email Label",
                placeholder: "custom email placeholder",
                required: true,
              },
              {
                type: "password",
                label: "Custom Password Label",
                placeholder: "custom password placeholder",
                required: true,
              },
              {
                type: "phone_number",
                label: "Custom Phone Label",
                placeholder: "custom Phone placeholder",
                required: false,
              },
            ]}
          />
          <AmplifySignIn slot="sign-in" usernameAlias="email" />
        </AmplifyAuthenticator>
      </div>
    );
  }
}

export default SignUp;
