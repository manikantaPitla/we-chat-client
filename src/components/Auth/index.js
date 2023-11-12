import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import MultipleAvatars from "../MultipleAvatars";
import noUser from "../../images/no_user.png";

import { v4 } from "uuid";

import {
  Main,
  Card,
  Form,
  Heading,
  Input,
  FormBtn,
  AvatarContainer,
  NoUserImg,
  PopUpBody,
} from "./styledComponents";

const toastSettings = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Auth = (props) => {
  const [authData, setAuthData] = useState({ name: "", room: "" });

  const [avatar, setAvatar] = useState(noUser);

  const handleFormData = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const setSelectedAvatar = (image) => {
    setAvatar(image);
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    if (avatar === noUser) {
      return toast.error("Avatar Required!", { ...toastSettings });
    } else if (!authData.name) {
      return toast.error("Name Required!", { ...toastSettings });
    } else if (!authData.room) {
      return toast.error("Rooom ID Required!", { ...toastSettings });
    }

    const userData = {
      id: v4(),
      room: authData.room,
      name: authData.name,
      avatarImg: avatar,
    };

    localStorage.setItem("WeChatUser", JSON.stringify(userData));
    props.history.replace("/");
  };

  const changeAvatarPopup = () => (
    <Popup
      modal
      trigger={<AvatarContainer type="button">Set Avatar</AvatarContainer>}
    >
      {(close) => (
        <PopUpBody>
          <MultipleAvatars
            setSelectedAvatar={setSelectedAvatar}
            avatar={avatar}
            close={close}
          />
        </PopUpBody>
      )}
    </Popup>
  );

  useEffect(() => {
    if (localStorage.getItem("WeChatUser")) {
      props.history.replace("/");
    }
  }, [props.history]);

  return (
    <Main>
      <Card>
        <Heading>We Chat</Heading>
        <NoUserImg>
          <img src={avatar} alt="avatar" />
        </NoUserImg>

        {changeAvatarPopup()}

        <Form onSubmit={onClickLogin}>
          <Input
            type="text"
            placeholder="Enter your name"
            onChange={handleFormData}
            name="name"
            value={authData.name}
          />
          <Input
            type="text"
            placeholder="Enter room ID"
            onChange={handleFormData}
            name="room"
            value={authData.room}
          />
          <FormBtn type="submit">Enter Room</FormBtn>
        </Form>
      </Card>
      <ToastContainer {...toastSettings} />
    </Main>
  );
};

export default Auth;
