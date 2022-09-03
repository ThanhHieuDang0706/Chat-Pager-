import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";

const cookies = new Cookies();

const SideBar = (props) => {
  const { logout } = props;
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={HospitalIcon} alt="hospital" width="30" />
        </div>
      </div>

      <div className="channel-list__sidebar__icon2">
        <div className="icon1__inner" onClick={logout}>
          <img src={LogoutIcon} alt="Logout" width="30" />
        </div>
      </div>
    </div>
  );
};

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = (props) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("userId");
    cookies.remove("phoneNumber");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");

    window.location.reload();
  };

  const filters = {
    members: {
      $in: [client.userID],
    },
  };

  return (
    <>
      <SideBar logout={logout} />

      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />

        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList {...listProps} {...props} type="team" />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} {...props} type="team" />
          )}
        />

        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList {...listProps} {...props} type="messaging" />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview {...previewProps} {...props} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((prev) => !prev)}
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
