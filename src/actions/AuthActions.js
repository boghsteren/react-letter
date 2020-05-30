import Axios from "axios";
import { store } from "../App";
import { toaster } from "evergreen-ui";
import { getGames } from "./GamesActions";

export const getActiveUser = async () => {
  const { data } = await Axios.get("/api/users/me");
  const { user } = data;
  if (user) {
    store.dispatch({ type: "SET_USER", items: user });
    getGames();
    toaster.success(`Hi ${user.username}- you are logged in.`);
  }
};

export const createUser = async ({ username, password }) => {
  const { data } = await Axios.post("/api/users", { username, password });
  const { name } = data;
  if (name) {
    store.dispatch({ type: "UPDATE_USER", items: data });
    toaster.success(`Welcome onboard ${name}- you are logged in.`);
  } else {
    toaster.danger("Sorry - we couldn't create a user for you!");
    return name;
  }
};

export const logout = async () => {
  try {
    await Axios.post("/api/users/logout");
    store.dispatch({ type: "SET_USER", items: null });
    toaster.notify("Logged out");
  } catch (e) {
    toaster.danger("Damn. Logout failed :-(");
    console.log(e);
  }
};

export const login = async ({ username, password }) => {
  try {
    const { data } = await Axios.post("/api/users/login", {
      username,
      password,
    });
    store.dispatch({ type: "SET_USER", items: data });
    getGames();
    toaster.success(`Welcome back ${data.username}`);
  } catch (e) {
    toaster.danger("Damn. Login failed :-(");
    console.log(e);
    return;
  }
};
