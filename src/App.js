import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
import LoaderComponent from "./actions/LoaderComponent";
import UserActions from "./actions/UserActions";
import { AppRouter } from "./AppRouter";
import Sockets from "./actions/Sockets";

export const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <LoaderComponent>
      <UserActions>
        <Sockets>
          <AppRouter />
        </Sockets>
      </UserActions>
    </LoaderComponent>
  </Provider>
);
