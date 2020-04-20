import React, { useContext } from "react";
import { Pane } from "evergreen-ui";
import { LoginBox } from "../components/UserLoginBox";
import { GamesBox } from "../components/GamesBox";
import { GameCreateNewBox } from "../components/GameCreateNewBox";
import { ChatBox } from "../components/ChatBox";
import { UserContext } from "../actions/UserActions";

export default ({ createGame, joinGame, deleteGame, myGames, openGames }) => {
  const { user } = useContext(UserContext);
  return (
    <Pane>
      <Pane display="flex" flexWrap="wrap" margin="20px">
        {!user && (
          <Pane>
            <LoginBox></LoginBox>
          </Pane>
        )}
        {user && (
          <GamesBox
            games={openGames}
            joinGame={joinGame}
            title="Open games"
          ></GamesBox>
        )}
        {user && <ChatBox room="lobby"></ChatBox>}

        {user && (
          <Pane>
            <GamesBox
              games={myGames}
              deleteGame={deleteGame}
              title="My games"
            ></GamesBox>
            <GameCreateNewBox createGame={createGame}></GameCreateNewBox>
          </Pane>
        )}
      </Pane>
    </Pane>
  );
};
