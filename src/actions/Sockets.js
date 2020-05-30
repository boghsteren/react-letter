import React from "react";
import { socket } from "../services/socket";
import { store } from "../App";

export const Sockets = ({ children }) => {
  socket.on("game_added", ({ game }) =>
    store.dispatch({ type: "ADD_GAMES", item: game })
  );
  socket.on("game_deleted", ({ game }) =>
    store.dispatch({ type: "REMOVE_GAMES", item: game })
  );
  socket.on("game_updated", ({ game }) => {
    store.dispatch({ type: "UPDATES_GAMES", item: game });
  });
  return <div>{children}</div>;
};

export default Sockets;
