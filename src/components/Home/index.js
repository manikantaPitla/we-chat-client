import { useState, useEffect } from "react";
import moment from "moment";

import {
  HomeContainer,
  Navigation,
  Heading,
  LogoutBtn,
  MainContent,
  ChatItem,
  ChatUser,
  ChatMessage,
  ChatInputContainer,
  InputFlex,
  EmojiContainer,
  EmojiBtn,
  ChatInput,
  SendBtn,
} from "./styledComponents";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import { FaRegLaugh } from "react-icons/fa";

import Picker from "emoji-picker-react";

import { io } from "socket.io-client";
const socket = io("https://we-chat-server-orqr.onrender.com/");

const Home = (props) => {
  const [userInput, setUserInput] = useState("");
  const [localUser, SetLocalUser] = useState({});
  const [messagesList, setmessagesList] = useState([]);
  const [renderEmojiContainer, setRenderEmojiContainer] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const msgData = {
      sender: localUser.name,
      message: userInput,
      time: moment().format("hh:mm a"),
    };

    socket.emit("messenger", msgData);
    setUserInput("");
  };

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setmessagesList((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("messenger", handleNewMessage);
    return () => {
      socket.off("messenger", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("WeChatUser"));
    SetLocalUser(localUser);
  }, [SetLocalUser]);

  return (
    <HomeContainer>
      <Navigation>
        <Heading>We Chat</Heading>
        <LogoutBtn
          title="Log out"
          onClick={() => {
            localStorage.clear("WeChatUser");
            props.history.replace("/auth");
          }}
        >
          <FiLogOut />
        </LogoutBtn>
      </Navigation>
      <MainContent onClick={() => setRenderEmojiContainer(false)}>
        {messagesList.map((eachMessage, index) => {
          const sender = eachMessage.sender === localUser.name;

          return (
            <ChatItem key={index}>
              <ChatUser sender={sender}>{eachMessage.sender}</ChatUser>
              <ChatMessage sender={sender}>{eachMessage.message}</ChatMessage>
            </ChatItem>
          );
        })}
      </MainContent>
      <ChatInputContainer onSubmit={handleSendMessage}>
        {renderEmojiContainer && (
          <EmojiContainer>
            <Picker
              searchDisabled={true}
              width={300}
              height={400}
              onEmojiClick={(emoji) =>
                setUserInput((prevMsg) => prevMsg + emoji.emoji)
              }
            />
          </EmojiContainer>
        )}
        <InputFlex>
          <EmojiBtn
            type="button"
            onClick={() => setRenderEmojiContainer((prevState) => !prevState)}
          >
            <FaRegLaugh />
          </EmojiBtn>
          <ChatInput
            type="text"
            placeholder="Message"
            value={userInput}
            autoFocus
            onChange={(e) => setUserInput(e.target.value)}
            onFocus={() => setRenderEmojiContainer(false)}
          />
        </InputFlex>
        <SendBtn type="submit">
          <AiOutlineSend />
        </SendBtn>
      </ChatInputContainer>
    </HomeContainer>
  );
};

export default Home;
