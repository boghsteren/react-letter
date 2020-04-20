import React, { useContext } from "react";
import FrontPage from "./layouts/FrontPage";
import { GamePage } from "./layouts/GamePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Pane, Spinner } from "evergreen-ui";
import { NavigationTopBar } from "./components/NavigationTopBar";
import { LoaderContext } from "./actions/LoaderComponent";
import { GamesContext } from "./actions/GameActions";

export const AppRouter = () => {
  const context = useContext(LoaderContext);
  const { loading } = context;
  const { openGames, myGames } = useContext(GamesContext);
  return (
    <Router>
      <Pane>
        {loading ? (
          <Pane
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
          >
            <Spinner></Spinner>
          </Pane>
        ) : (
          <NavigationTopBar></NavigationTopBar>
        )}
        <Switch>
          <Route exact path="/">
            <FrontPage myGames={myGames} openGames={openGames}></FrontPage>
          </Route>
          <Route path="/:id">
            <GamePage games={[...myGames, openGames]}></GamePage>
          </Route>
        </Switch>
      </Pane>
    </Router>
  );
};
