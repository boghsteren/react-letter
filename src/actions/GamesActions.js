import Axios from "axios";
import { store } from "../App";
import { toaster } from "evergreen-ui";

export const getGames = async () => {
  try {
    const { data } = await Axios.get("/api/game/game_love_letter/");
    store.dispatch({ type: "SET_GAMES", items: [...data] });
  } catch (e) {
    console.log(e);
    toaster.danger("Sorry - we couldn't retrieve games!");
    return e;
  }
};

export const createGame = async ({ game_name }) => {
  try {
    const { data } = await Axios.post("/api/game/game_love_letter", {
      game: {
        game_name,
      },
    });
    toaster.success("Game created!");
    store.dispatch({ type: "UPDATE_GAMES", item: data });
  } catch (e) {
    console.log(e);
    toaster.warning("Failed to create game");
  }
};

export const deleteGame = async ({ gameID }) => {
  try {
    const { data } = await Axios.delete(`/api/game/game_love_letter/${gameID}`);
    toaster.success("Game deleted!");
    store.dispatch({ type: "REMOVE_GAMES", item: data });
  } catch (e) {
    console.log(e);
    toaster.warning("Failed to delete game");
  }
};

export const joinGame = async ({ gameID }) => {
  try {
    const { data } = await Axios.put(
      `/api/game/game_love_letter/${gameID}/join`
    );
    store.dispatch({ type: "UPDATE_GAMES", item: data });
    toaster.success(`Succesfully joined ${data.game_name}`);
  } catch (e) {
    console.log(e);
    toaster.warning("Failed to join game");
  }
};

export const leaveGame = async ({ gameID }) => {
  try {
    const { data } = await Axios.put(
      `/api/game/game_love_letter/${gameID}/leave`
    );
    store.dispatch({ type: "UPDATE_GAMES", item: data });
    toaster.success(`Succesfully left ${data.game_name}`);
  } catch (e) {
    console.log(e);
    toaster.warning("Failed to leave game");
  }
};
