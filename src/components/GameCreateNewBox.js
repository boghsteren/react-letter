import React, { useState } from "react";
import { Pane, TextInputField, Button } from "evergreen-ui";
import { createGame } from "../actions/GamesActions";

export const GameCreateNewBox = () => {
  const [game_name, setGame_name] = useState("");
  const submitGame = (e) => {
    e.preventDefault();
    createGame({ game_name });
    setGame_name("");
  };
  return (
    <Pane
      background="tint1"
      padding="20px"
      border="default"
      marginTop="20px"
      elevation={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <form>
        <TextInputField
          label="Game name"
          value={game_name}
          onChange={(e) => setGame_name(e.target.value)}
        ></TextInputField>
        <Button
          marginLeft="10px"
          appearance="primary"
          intent="success"
          iconBefore="add"
          onClick={submitGame}
        >
          Setup game
        </Button>{" "}
      </form>
    </Pane>
  );
};
