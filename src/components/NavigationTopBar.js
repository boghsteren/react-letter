import React from "react";
import { Pane, Popover, Avatar, Tooltip, Heading, Menu } from "evergreen-ui";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../actions/AuthActions";

export const NavigationTopBar = () => {
  const { user } = useSelector((state) => state);
  let history = useHistory();
  return (
    <Pane
      padding="10px"
      border="default"
      background="#F7F9FD"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="70px"
    >
      <Pane>
        <Heading size={600} cursor="pointer" onClick={() => history.push("/")}>
          React Letter
        </Heading>
      </Pane>

      {user?.username && (
        <Tooltip content={`Logged in as ${user.username}`}>
          <Pane cursor="pointer">
            <Popover
              position="bottom-right"
              content={
                <Menu>
                  <Menu.Group>
                    <Menu.Item icon="user">Profile</Menu.Item>

                    <Menu.Item onSelect={() => logout()} icon="log-out">
                      Log out
                    </Menu.Item>
                  </Menu.Group>
                </Menu>
              }
            >
              <Avatar name={user.username} size={40} />
            </Popover>
          </Pane>
        </Tooltip>
      )}
    </Pane>
  );
};
