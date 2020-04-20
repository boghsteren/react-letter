import React from "react";
import { GameActions } from "./actions/GameActions";
import LoaderComponent from "./actions/LoaderComponent";
import UserActions from "./actions/UserActions";
import { AppRouter } from "./AppRouter";
import Sockets from "./actions/Sockets";

export const App = () => (
  <GameActions>
    <LoaderComponent>
      <UserActions>
        <Sockets>
          <AppRouter />
        </Sockets>
      </UserActions>
    </LoaderComponent>
  </GameActions>
);
