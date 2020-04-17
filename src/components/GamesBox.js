import React from "react";
import {
  Pane,
  Heading,
  Badge,
  Card,
  Strong,
  Icon,
  Tooltip,
  IconButton,
  Text,
} from "evergreen-ui";
import { useHistory } from "react-router-dom";

export const GamesBox = ({ games, title, deleteGame }) => {
  let history = useHistory();
  const seats = [1, 2, 3, 4, 5];
  return (
    <Pane
      padding="20px"
      marginTop="20px"
      border="default"
      elevation={1}
      background="tint1"
    >
      <Heading size={700} marginBottom="20px">
        {title}
      </Heading>
      {games?.map((game) => (
        <Pane display="flex">
          <Card
            key={game._id}
            background="white"
            padding="10px"
            marginTop="10px"
            cursor="pointer"
            hoverElevation={2}
            onClick={() => history.push(`/${game._id}`)}
            display="flex"
            border="default"
            alignItems="center"
          >
            <Strong
              marginRight="10px"
              width="200px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {game.game_name}
            </Strong>
            <Pane marginRight="10px">
              {seats.map((seat) => (
                <Tooltip
                  key={seat}
                  content={seat > game.players.length ? "Open" : "Player"}
                >
                  <Icon
                    icon="person"
                    color={seat > game.players.length ? "disabled" : "black"}
                  ></Icon>
                </Tooltip>
              ))}
            </Pane>
            <Badge marginRight="10px" color={game.started ? "blue" : "purple"}>
              {game.started ? "Started" : "Not started"}
            </Badge>
          </Card>{" "}
          {deleteGame && (
            <IconButton
              onClick={() => deleteGame(game._id)}
              icon="trash"
              margin="10px"
            ></IconButton>
          )}
        </Pane>
      ))}
      {games.length === 0 && <Text>No games found</Text>}
    </Pane>
  );
};
