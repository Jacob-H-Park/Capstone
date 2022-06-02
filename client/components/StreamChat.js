import React, { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  useChatContext,
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";
const apiKey = process.env.STREAM_API_KEY;

const user = {
  id: "7",
  name: "John",
  // image,
};

// sort
const sort = { last_message_at: -1 };
//filter can be applied as well - look in the docs

const CustomChannelHeader = () => {
  const { channel } = useChatContext();
  const { data } = channel;
  return (
    <header
      style={{
        height: "50px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {
        <img
          style={{
            width: "150px",
            height: "auto",
          }}
          src={"../photos/LoopedIn2.png"}
          alt="not found"
        />
      }
    </header>
  );
};
const StreamMessenger = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser(user, chatClient.devToken(user.id));

      const channel = chatClient.channel("messaging", "channel-what", {
        // image:
        name: "Chatroom 3",
        members: [user.id],
      });
      await channel.watch();

      setClient(chatClient);
    }
    init();

    if (client) return () => client.disconnectUser();
  }, []);

  if (!client) return <LoadingIndicator />;

  return (
    <Chat client={client} theme="messaging dark">
      <ChannelList sort={sort} />
      <Channel>
        <Window>
          <CustomChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default StreamMessenger;
