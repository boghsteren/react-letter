import React from "react";
import { Pane, Popover, Avatar, Tooltip, Heading, Menu } from "evergreen-ui";
import { useHistory } from "react-router-dom";

export const NavigationTopBar = ({ user, logout }) => {
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

      {user && (
        <Tooltip content={`Logged in as ${user}`}>
          <Pane cursor="pointer">
            <Popover
              position="bottom-right"
              content={
                <Menu>
                  <Menu.Group>
                    <Menu.Item icon="user">Profile</Menu.Item>

                    <Menu.Item onSelect={logout} icon="log-out">
                      Log out
                    </Menu.Item>
                  </Menu.Group>
                </Menu>
              }
            >
              <Avatar name={user} size={40} />
            </Popover>
          </Pane>
        </Tooltip>
      )}
    </Pane>
  );
};
