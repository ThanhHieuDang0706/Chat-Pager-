import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelListContainer, ChannelContainer } from "./components";

import "./App.css";

const apiKey = "hx8bz7czqe2r";

const App = () => {
  const client = StreamChat.getInstance(apiKey);

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        {/** Our custom components go here */}
        <ChannelListContainer />

        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
