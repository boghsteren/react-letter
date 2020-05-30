import React, { useState } from "react";
import { Pane, TextInputField, Button, Heading, Dialog } from "evergreen-ui";
import { login, createUser } from "../actions/AuthActions";

export const SignupBox = () => {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [isShown, updateShown] = useState(false);
  const [isLoading, updateLoading] = useState(false);
  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title="Create a new user"
        onCloseComplete={() => {
          updateShown(false);
          updateLoading(false);
        }}
        isConfirmLoading={isLoading}
        onConfirm={async () => {
          updateLoading(true);
          await createUser({ username, password });
          updateLoading(false);
          login({ username, password });
        }}
        confirmLabel={isLoading ? "Loading..." : "Create user"}
      >
        <Heading marginBottom="20px" size={600}>
          Sign up
        </Heading>
        <TextInputField
          label="User name"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
        ></TextInputField>
        <TextInputField
          label="Password"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
        ></TextInputField>
      </Dialog>
      <Button
        onClick={(e) => {
          e.preventDefault();
          updateShown(true);
        }}
      >
        Create user
      </Button>
    </Pane>
  );
};
