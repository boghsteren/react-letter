import React, { useState, createContext, useContext, useEffect } from "react";
import Axios from "axios";
import { toaster } from "evergreen-ui";
import { GamesContext } from "./GameActions";
import { LoaderContext } from "./LoaderComponent";

export const UserContext = createContext();

export const UserActions = ({ children }) => {
  const { setMyGames, setOpenGames } = useContext(GamesContext);
  const { setLoading } = useContext(LoaderContext);
  const [user, updateUser] = useState();
  useEffect(() => {
    const getData = async () => {
      const { data } = await Axios.get("/api/users/me");
      const { user } = data;
      if (user) {
        updateUser(user);
        Axios.get("/api/game/game_love_letter/mine").then(({ data }) =>
          setMyGames([...data])
        );
        Axios.get("/api/game/game_love_letter/open").then(({ data }) =>
          setOpenGames([...data])
        );
      }
      setLoading(false);
    };
    getData();
  }, []);

  const createUser = async ({ username, password }) => {
    const { data } = await Axios.post("/api/users", { username, password });
    const { name } = data;
    if (name) {
      updateUser(data);
      toaster.success(`Welcome onboard ${name}- you are logged in.`);
    } else {
      toaster.danger("Sorry - we couldn't create a user for you!");
      return name;
    }
  };
  const logout = async ({ updateUser }) => {
    try {
      await Axios.post("/api/users/logout");
      updateUser("");
      toaster.notify("Logged out");
    } catch (e) {
      toaster.danger("Damn. Logout failed :-(");
      console.log(e);
    }
  };

  const login = async (username, password) => {
    try {
      const { data } = await Axios.post("/api/users/login", {
        username,
        password,
      });
      updateUser(data);
      toaster.success(`Welcome back ${data.username}`);
      Axios.get("/api/game/mine").then(({ data }) => setMyGames([...data]));
      Axios.get("/api/game/open").then(({ data }) => setOpenGames([...data]));
    } catch (e) {
      toaster.danger("Damn. Login failed :-(");
      console.log(e);
      return;
    }
  };
  return (
    <UserContext.Provider
      value={{ user, logout, login, updateUser, createUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserActions;
