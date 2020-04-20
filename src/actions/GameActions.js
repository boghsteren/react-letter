import React, { createContext, useState } from "react";
import Axios from "axios";
import { toaster } from "evergreen-ui";

export const GamesContext = createContext();

export const GameActions = ({ children }) => {
  const [myGames, setMyGames] = useState([]);
  const [openGames, setOpenGames] = useState([]);
  const createGame = async (game_name) => {
    try {
      const { data } = await Axios.post("/api/game/game_love_letter", {
        game: {
          game_name,
        },
      });
      toaster.success("Game created!");
      setMyGames([...myGames, data]);
    } catch (e) {
      console.log(e);
      toaster.warning("Failed to create game");
    }
  };
  const deleteGame = async (gameID) => {
    try {
      const { data } = await Axios.delete(
        `/api/game/game_love_letter/${gameID}`
      );
      toaster.success("Game deleted!");
      setMyGames([...myGames.filter((game) => game._id !== data._id)]);
    } catch (e) {
      console.log(e);
      toaster.warning("Failed to delete game");
    }
  };
  const joinGame = async (gameID) => {
    try {
      const { data } = await Axios.put(
        `/api/game/game_love_letter/${gameID}/join`
      );
      toaster.success(`Succesfully joined ${data.game_name}`);
    } catch (e) {
      console.log(e);
      toaster.warning("Failed to join game");
    }
  };
  return (
    <div>
      <GamesContext.Provider
        value={{
          openGames,
          myGames,
          createGame,
          deleteGame,
          joinGame,
          setMyGames,
          setOpenGames,
        }}
      >
        {children}
      </GamesContext.Provider>
    </div>
  );
};
