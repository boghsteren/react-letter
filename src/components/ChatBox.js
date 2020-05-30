import React, { useEffect, useState, useRef } from "react";
import { Pane, Button, Text, TextInput } from "evergreen-ui";
import Axios from "axios";
import { socket } from "../services/socket";

export const ChatBox = ({ room }) => {
  const [chat, updateChat] = useState([]);
  const [draft, setDraft] = useState("");
  const messagesEnd = useRef();
  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get(`/api/chats/${room}`);
      updateChat(res.data.messages || []);
    };
    getData();
  }, [room]);
  useEffect(() => {
    scrollToBottom({ block: "end" });
  });
  const sendMessage = async () => {
    await Axios.post(`/api/chats/${room}`, {
      room,
      message: draft,
    });
    setDraft("");
  };
  const scrollToBottom = () => {
    messagesEnd.current.scrollTo({
      behavior: "smooth",
      top: messagesEnd.current.scrollHeight,
    });
  };
  socket.on(room, (message) => updateChat([...chat, message]));
  return (
    <Pane
      background="tint1"
      padding="15px"
      border="default"
      margin="5px"
      elevation={1}
      minWidth="400px"
    >
      <Pane border="default">
        <div
          style={{
            background: "white",
            padding: "5px",
            overflow: "scroll",
            height: "400px",
          }}
          ref={messagesEnd}
        >
          {chat?.map((item, index) => (
            <Pane padding="5px" key={item.message + index}>
              <Text> {item.user?.username}: </Text>
              <Text>{item.message}</Text>
            </Pane>
          ))}
        </div>
      </Pane>

      <Pane paddingTop="10px" display="flex" justifyContent="space-between">
        <TextInput
          placeholder="New message"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        ></TextInput>
        <Button appearance="primary" marginLeft="10px" onClick={sendMessage}>
          Send
        </Button>
      </Pane>
    </Pane>
  );
};
