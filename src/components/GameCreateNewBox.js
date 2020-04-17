import React, { useState } from "react";
import { Pane, TextInputField, Button } from "evergreen-ui";

export const GameCreateNewBox = ({ createGame }) => {
  const [game_name, setGame_name] = useState("");
  const submitGame = (e) => {
    e.preventDefault();
    createGame(game_name);
    setGame_name("");
  };
  return (
    <form>
      <Pane
        background="tint1"
        padding="20px"
        border="default"
        marginTop="20px"
        elevation={1}
        width="500px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextInputField
          label="Game name"
          value={game_name}
          onChange={(e) => setGame_name(e.target.value)}
          width="300px"
        ></TextInputField>
        <Button
          marginLeft="10px"
          appearance="primary"
          intent="success"
          iconBefore="add"
          onClick={submitGame}
        >
          Setup game
        </Button>
      </Pane>
    </form>
  );
};
