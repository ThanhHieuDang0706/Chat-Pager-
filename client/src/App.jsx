import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";

import "stream-chat-react/dist/css/index.css";
import "./App.css";

const cookies = new Cookies();

const apiKey = "hx8bz7czqe2r";

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      id: cookies.get("userId"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        {/** Our custom components go here
         *! TODO: change to useContext here
         */}

        <ChannelListContainer
          isCreating={isCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
        />

        <ChannelContainer
          isCreating={isCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsCreating={setIsCreating}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
