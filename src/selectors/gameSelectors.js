import { createSelector } from "reselect";

const getGames = (state) => state.games;
const getUser = (state) => state.user;

export const selectHostedGames = createSelector(
  [getGames, getUser],
  (games, user) => games.filter((game) => game.host._id === user._id)
);

export const selectedOpenGames = createSelector([getGames], (games) =>
  games.filter((game) => !game.started)
);

export const selectJoinedGames = createSelector(
  [getGames, getUser],
  (games, user) =>
    games.filter((game) => game.players.map((p) => p._id).includes(user._id))
);
