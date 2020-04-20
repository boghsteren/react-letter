import React from "react";
import { GamesContext } from "./actions/GameActions";
import { LoaderComponent } from "./actions/LoaderComponent";
import UserActions from "./actions/UserActions";
import { AppRouter } from "./AppRouter";
import { Sockets } from "./actions/Sockets";

export const App = () => {
  return (
    <GamesContext>
      <LoaderComponent>
        <UserActions>
          <Sockets>
            <AppRouter></AppRouter>
          </Sockets>
        </UserActions>
      </LoaderComponent>
    </GamesContext>
  );
};
