import React from "react";
import { Pane } from "evergreen-ui";
import { LoginBox } from "../components/UserLoginBox";
import { GamesBox } from "../components/GamesBox";
import { GameCreateNewBox } from "../components/GameCreateNewBox";
import { ChatBox } from "../components/ChatBox";

export default ({
  user,
  createGame,
  createUser,
  login,
  deleteGame,
  myGames,
  openGames,
}) => {
  return (
    <Pane>
      <Pane display="flex" flexWrap="wrap" margin="20px">
        {!user && (
          <Pane>
            <LoginBox createUser={createUser} login={login}></LoginBox>
          </Pane>
        )}
        {user && (
          <Pane>
            <GamesBox
              games={myGames}
              deleteGame={deleteGame}
              title="My games"
            ></GamesBox>
            <GamesBox games={openGames} title="Open games"></GamesBox>
            <GameCreateNewBox createGame={createGame}></GameCreateNewBox>
          </Pane>
        )}
        {user && <ChatBox room="lobby"></ChatBox>}
      </Pane>
    </Pane>
  );
};
