import { useState, useEffect, useRef } from "react";
import moment from "moment";

import {
  HomeContainer,
  Navigation,
  Heading,
  RoomIdContainer,
  LogoutBtn,
  MainContent,
  ChatItem,
  GreetMessage,
  ChatUserFlex,
  ChatItemFlex,
  UserAvatar,
  ChatTime,
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

let socket;

const Home = (props) => {
  const [userInput, setUserInput] = useState("");
  const [localUser, SetLocalUser] = useState({});
  const [messagesList, setmessagesList] = useState([]);
  const [renderEmojiContainer, setRenderEmojiContainer] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("WeChatUser"));
    SetLocalUser(localUserData);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messagesList]);

  useEffect(() => {
    if (localUser.room) {
      socket = io("https://we-chat-server-rev3.onrender.com/");

      socket.emit("joinRoom", { name: localUser.name, room: localUser.room });

      socket.on("userConnected", (payload) => {
        setmessagesList((prevMessages) => [...prevMessages, payload]);
      });

      socket.on("userDisconnected", (payload) => {
        setmessagesList((prevMessages) => [...prevMessages, payload]);
      });

      socket.on("messenger", (newMessage) => {
        setmessagesList((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off();
      };
    }
  }, [localUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const msgData = {
      sender: localUser.name,
      message: userInput,
      avatar: localUser.avatarImg,
      time: moment().format("hh:mm a"),
    };

    if (userInput) {
      socket.emit("messenger", msgData);
      setUserInput("");
    }

    setRenderEmojiContainer(false);
  };

  return (
    <HomeContainer>
      <Navigation>
        <Heading>We Chat</Heading>
        <RoomIdContainer>Room: {localUser.room}</RoomIdContainer>
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
      <MainContent
        ref={chatContainerRef}
        onClick={() => setRenderEmojiContainer(false)}
      >
        {messagesList.map((eachMessage, index) => {
          const sender = eachMessage.sender === localUser.name;
          return (
            <ChatItem key={index}>
              {eachMessage.sender === "server" ? (
                <GreetMessage key={index}>{eachMessage.message}</GreetMessage>
              ) : (
                <>
                  <ChatUserFlex>
                    <UserAvatar src={eachMessage.avatar} />
                    <ChatTime>{eachMessage.time}</ChatTime>
                  </ChatUserFlex>
                  <ChatItemFlex>
                    <ChatUser sender={sender}>
                      {sender ? "You" : eachMessage.sender}
                    </ChatUser>
                    <ChatMessage sender={sender}>
                      {eachMessage.message}
                    </ChatMessage>
                  </ChatItemFlex>
                </>
              )}
            </ChatItem>
          );
        })}
      </MainContent>
      <ChatInputContainer onSubmit={handleSendMessage}>
        {renderEmojiContainer && (
          <EmojiContainer>
            <Picker
              lazyLoadEmojis={true}
              searchDisabled={true}
              previewConfig={{ showPreview: false }}
              suggestedEmojisMode="recent"
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
