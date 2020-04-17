import Axios from "axios";
import { toaster } from "evergreen-ui";

export const createUser = async (username, password, updateUser) => {
  const response = await Axios.post("/api/users", { username, password });
  if (response.data.username) {
    updateUser(response.data.username);
    toaster.success("Welcome onboard - you are logged in.");
  } else {
    toaster.danger("Sorry - we couldn't create a user for you!");
    return;
  }
};
