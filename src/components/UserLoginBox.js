import React, { useState } from "react";
import { Pane, Heading, TextInputField, Button } from "evergreen-ui";
import { SignupBox } from "./UserSignUpBox";

export const LoginBox = ({ login, createUser }) => {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  return (
    <Pane
      width="300px"
      border="default"
      padding="20px"
      margin="20px"
      elevation={1}
      minWidth="300px"
    >
      <form>
        <Heading marginBottom="20px" size={600}>
          Log in
        </Heading>
        <TextInputField
          id="login_user"
          label="User name"
          value={username}
          onChange={(e) => updateUsername(e.target.value)}
        ></TextInputField>
        <TextInputField
          type="password"
          id="login_password"
          label="Password"
          value={password}
          onChange={(e) => updatePassword(e.target.value)}
        ></TextInputField>
        <Pane display="flex" justifyContent="space-between">
          <Button
            onClick={(e) => {
              e.preventDefault();
              login(username, password);
            }}
          >
            Log in
          </Button>
          <SignupBox createUser={createUser} login={login}></SignupBox>
        </Pane>
      </form>
    </Pane>
  );
};
