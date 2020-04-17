import React from "react";
import { ChatBox } from "../components/ChatBox";
import { Heading, Pane } from "evergreen-ui";
import { useParams } from "react-router-dom";

export const GamePage = ({ games }) => {
  let { id } = useParams();
  const game = games?.find((game) => game._id === id);
  return (
    <Pane display="flex" margin="10px">
      <Pane
        padding="20px"
        margin="20px"
        border="default"
        width="500px"
        elevation={1}
        background="tint1"
      >
        <Heading>{game?.game_name}</Heading>
      </Pane>
      <ChatBox room={game?._id}></ChatBox>
    </Pane>
  );
};
