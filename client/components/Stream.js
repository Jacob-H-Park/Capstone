import React, { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import {
  ChannelListContainer,
  ChannelContainer,
} from "./StreamPackage/index.js";

import "stream-chat-react/dist/css/index.css";
import "./assets/Stream.css";

const cookies = new Cookies();
const apiKey = process.env.STREAM_API_KEY;

const Stream = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [client, setClient] = useState(null);

  useEffect(() => {
    const token = cookies.get("token");
    setAuthToken(token);

    const client = StreamChat.getInstance(apiKey);
    setClient(client);

    if (token) {
      client.connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
        },
        token
      );
    }
  }, []);

  if (!authToken) return <div>token not set</div>;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default Stream;
