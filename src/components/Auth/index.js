import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import MultipleAvatars from "../MultipleAvatars";
import noUser from "../../images/no_user.png";

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
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(noUser);

  const handleFormData = (e) => {
    setName(e.target.value);
  };

  const setSelectedAvatar = (image) => {
    setAvatar(image);
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    if (avatar === noUser) {
      return toast.error("Avatar Required!", { ...toastSettings });
    } else if (!name) {
      return toast.error("Name Required!", { ...toastSettings });
    }

    const userData = {
      name: name,
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
        <NoUserImg src={avatar} alt="avatar" />

        {changeAvatarPopup()}

        <Form onSubmit={onClickLogin}>
          <Input
            type="text"
            placeholder="Enter your name"
            onChange={handleFormData}
            value={name}
          />
          <FormBtn type="submit">Enter</FormBtn>
        </Form>
      </Card>
      <ToastContainer {...toastSettings} />
    </Main>
  );
};

export default Auth;
