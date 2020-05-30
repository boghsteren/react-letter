import React from "react";
import { Pane } from "evergreen-ui";
import { LoginBox } from "../components/UserLoginBox";
import { GamesBox } from "../components/GamesBox";
import { GameCreateNewBox } from "../components/GameCreateNewBox";
import { ChatBox } from "../components/ChatBox";
import { useSelector } from "react-redux";
import {
  selectHostedGames,
  selectedOpenGames,
  selectJoinedGames,
} from "../selectors/gameSelectors";

export default () => {
  const { user } = useSelector((state) => state);
  const { username } = user;
  const myGames = useSelector(selectJoinedGames);
  const hostedGames = useSelector(selectHostedGames);
  const openGames = useSelector(selectedOpenGames);
  return (
    <Pane>
      <Pane display="flex" margin="20px" flexWrap="wrap">
        {!username && (
          <Pane minWidth="400px">
            <LoginBox></LoginBox>
          </Pane>
        )}
        {username && (
          <Pane style={{ flexGrow: 1 }}>
            <GamesBox games={openGames} joinAble title="Open games"></GamesBox>
          </Pane>
        )}
        {username && (
          <Pane style={{ flexGrow: 1 }}>
            <ChatBox room="lobby"></ChatBox>
          </Pane>
        )}

        {username && (
          <Pane style={{ flexGrow: 1 }}>
            <GamesBox
              games={hostedGames}
              deleteAble
              title="Hosted games"
            ></GamesBox>
            <GamesBox games={myGames} title="My games" leaveAble></GamesBox>
            <GameCreateNewBox></GameCreateNewBox>
          </Pane>
        )}
      </Pane>
    </Pane>
  );
};
