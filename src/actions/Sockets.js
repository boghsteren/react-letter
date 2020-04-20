import React, { useContext } from "react";
import { socket } from "../services/socket";
import { GamesContext } from "./GameActions";
import { UserContext } from "./UserActions";

export const Sockets = ({ children }) => {
  const { openGames, setOpenGames, myGames, setMyGames } = useContext(
    GamesContext
  );
  const { user } = useContext(UserContext);
  socket.on("game_added", (doc) => setOpenGames([...openGames, doc.game]));
  socket.on("game_deleted", (doc) =>
    setOpenGames([...openGames.filter((game) => game._id !== doc.game._id)])
  );
  socket.on("game_updated", (doc) => {
    setOpenGames([
      ...openGames.filter((game) => game._id !== doc.game._id),
      doc.game,
    ]);
    doc.game.host?._id === user?._id &&
      setMyGames([
        ...myGames.filter((game) => game._id !== doc.game._id),
        doc.game,
      ]);
  });
  return <div>{children}</div>;
};

export default Sockets;
