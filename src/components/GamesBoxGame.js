import React from "react";
import {
  Pane,
  Card,
  IconButton,
  PersonIcon,
  Strong,
  Text,
  Tooltip,
  Badge,
} from "evergreen-ui";
import { useHistory } from "react-router-dom";
import { joinGame, leaveGame, deleteGame } from "../actions/GamesActions";

export default ({ game, deleteAble, joinAble, leaveAble }) => {
  const seats = [...Array(game.max_players).keys()];
  console.log(seats);
  let history = useHistory();
  return (
    <Pane display="flex" key={game._id} width="100%">
      <Card
        background="white"
        padding="10px"
        marginTop="10px"
        width="100%"
        cursor="pointer"
        hoverElevation={2}
        onClick={() => history.push(`/${game._id}`)}
        display="flex"
        justifyContent="space-between"
        border="default"
        alignItems="center"
      >
        <Strong
          marginRight="10px"
          width="100px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {game.game_name}
        </Strong>
        <Text marginLeft="10px" marginRight="10px" width="50px">
          {game.host?.username}
        </Text>
        <Pane marginRight="10px">
          {seats.map((seat) => (
            <Tooltip
              key={seat}
              content={seat >= game.players.length ? "Open" : "Player"}
            >
              <PersonIcon
                icon="person"
                color={seat >= game.players.length ? "disabled" : "black"}
              ></PersonIcon>
            </Tooltip>
          ))}
        </Pane>
        <Badge marginRight="10px" color={game.started ? "blue" : "purple"}>
          {game.started ? "Started" : "Not started"}
        </Badge>
      </Card>
      {deleteAble && (
        <IconButton
          onClick={() => deleteGame({ gameID: game._id })}
          icon="trash"
          margin="10px"
        ></IconButton>
      )}
      {joinAble && (
        <IconButton
          onClick={() => joinGame({ gameID: game._id })}
          icon="add"
          margin="10px"
        ></IconButton>
      )}
      {leaveAble && (
        <IconButton
          onClick={() => leaveGame({ gameID: game._id })}
          icon="remove"
          margin="10px"
        ></IconButton>
      )}
    </Pane>
  );
};
