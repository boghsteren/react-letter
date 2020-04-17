import React, { useState, useEffect } from "react";
import FrontPage from "./layouts/FrontPage";
import { GamePage } from "./layouts/GamePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";
import { toaster, Pane, Spinner } from "evergreen-ui";
import { NavigationTopBar } from "./components/NavigationTopBar";

export const AppRouter = () => {
  const [loading, setLoading] = useState(true);
  const [myGames, setMyGames] = useState([]);
  const [openGames, setOpenGames] = useState([]);
  const [user, updateUser] = useState("");
  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get("/api/users/me");
      res.data.user && updateUser(res.data.user.username);
      res.data.user &&
        Axios.get("/api/game/mine").then((res) => setMyGames([...res.data]));
      res.data.user &&
        Axios.get("/api/game/open").then((res) => setOpenGames([...res.data]));
      setLoading(false);
    };
    getData();
  }, []);
  const createUser = async (username, password) => {
    const response = await Axios.post("/api/users", { username, password });
    if (response.data.username) {
      updateUser(response.data.username);
      toaster.success("Welcome onboard - you are logged in.");
    } else {
      toaster.danger("Sorry - we couldn't create a user for you!");
      return response.data.username;
    }
  };
  const login = async (username, password) => {
    try {
      const response = await Axios.post("/api/users/login", {
        username,
        password,
      });
      updateUser(response.data.username);
      toaster.success(`Welcome back ${response.data.username}`);
      Axios.get("/api/game/mine").then((res) => setMyGames([...res.data]));
      Axios.get("/api/game/open").then((res) => setOpenGames([...res.data]));
    } catch (e) {
      toaster.danger("Damn. Login failed :-(");
      return;
    }
  };
  const logout = async () => {
    try {
      await Axios.post("/api/users/logout");
      updateUser("");
      toaster.notify("Logged out");
    } catch (e) {
      toaster.danger("Damn. Logout failed :-(");
    }
  };
  const createGame = async (game_name) => {
    const response = await Axios.post("/api/game", {
      game: {
        game_name: game_name,
      },
    });
    toaster.success("Game created!");
    setMyGames([...myGames, response.data]);
  };
  const deleteGame = async (gameID) => {
    console.log(gameID);
    const response = await Axios.delete(`/api/game/${gameID}`);
    toaster.success("Game deleted!");
    setMyGames([...myGames.filter((game) => game._id !== response.data._id)]);
    setOpenGames([
      ...openGames.filter((game) => game._id !== response.data._id),
    ]);
  };
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
          <NavigationTopBar logout={logout} user={user}></NavigationTopBar>
        )}
        <Switch>
          <Route exact path="/">
            <FrontPage
              myGames={myGames}
              openGames={openGames}
              user={user}
              createUser={createUser}
              login={login}
              createGame={createGame}
              deleteGame={deleteGame}
            ></FrontPage>
          </Route>
          <Route path="/:id">
            <GamePage games={[...myGames, openGames]}></GamePage>
          </Route>
        </Switch>
      </Pane>
    </Router>
  );
};
