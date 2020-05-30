import React from "react";
import { Pane, Heading, Text } from "evergreen-ui";
import GamesBoxGame from "./GamesBoxGame";

export const GamesBox = ({ games, title, deleteAble, joinAble, leaveAble }) => {
  return (
    <Pane
      padding="15px"
      margin="5px"
      border="default"
      elevation={1}
      background="tint1"
      minWidth="400px"
    >
      <Heading size={700} marginBottom="20px">
        {title}
      </Heading>
      {games?.map((game) => (
        <GamesBoxGame
          key={game._id}
          game={game}
          joinAble={joinAble}
          leaveAble={leaveAble}
          deleteAble={deleteAble}
        ></GamesBoxGame>
      ))}
      {games.length === 0 && <Text>No games found</Text>}
    </Pane>
  );
};
