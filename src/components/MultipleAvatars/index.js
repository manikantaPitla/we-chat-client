import { useState, useEffect } from "react";
import { dotPulse } from "ldrs";
import axios from "axios";

import { RetryBtn, Avatar, FailureContainer } from "./styledComponents";

dotPulse.register();

const apiStatusRef = {
  initial: "INITIAL",
  pending: "PENDING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const MultipleAvatars = ({ setSelectedAvatar, avatar, close }) => {
  const [avatarList, setAvatarList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusRef.initial);

  const getMultipleAvatars = async () => {
    setApiStatus(apiStatusRef.pending);

    try {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const response = await axios.get(
          `https://api.multiavatar.com/${Math.ceil(
            Math.random() * 1000
          )}?apikey=7bIJBAy2vfmoec`
        );
        const base64Data = btoa(unescape(encodeURIComponent(response.data)));
        data.push(`data:image/svg+xml;base64,${base64Data}`);
      }

      setAvatarList(data);
      setApiStatus(apiStatusRef.success);
    } catch (e) {
      setApiStatus(apiStatusRef.failure);
    }
  };

  useEffect(() => {
    getMultipleAvatars();
  }, []);

  const renderLoader = () => (
    <l-dot-pulse
      className="loader"
      size="43"
      speed="1.3"
      color="#e81cff"
    ></l-dot-pulse>
  );

  const renderFailure = () => (
    <FailureContainer>
      <p>Too many requests. Please try again after 1 minute.</p>
      <RetryBtn type="button" onClick={() => getMultipleAvatars()}>
        Retry
      </RetryBtn>
    </FailureContainer>
  );

  const renderSuccess = () => {
    return (
      <>
        {avatarList.map((each, index) => {
          return (
            <Avatar
              key={index}
              onClick={() => setSelectedAvatar(each)}
              className={` ${avatar === each ? "selected-avatar" : ""}`}
            >
              <img src={each} alt="av" />
            </Avatar>
          );
        })}
      </>
    );
  };

  const renderAvatar = () => {
    switch (apiStatus) {
      case apiStatusRef.success:
        return renderSuccess();
      case apiStatusRef.failure:
        return renderFailure();
      default:
        return renderLoader();
    }
  };

  return (
    <>
      <>
        <h1>Choose an avatar to set as your profile.</h1>
      </>
      <div className="avatar-list">{renderAvatar()}</div>
      <div className="popup-btn-container">
        <button
          type="button"
          className="trigger-button"
          onClick={() => close()}
        >
          Set Avatar
        </button>
        <button
          type="button"
          className="trigger-button"
          onClick={getMultipleAvatars}
        >
          Refresh
        </button>
        <button
          type="button"
          className="trigger-button"
          onClick={() => close()}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default MultipleAvatars;
