import { useState, useEffect, useRef } from "react";
import moment from "moment";

import {
  HomeContainer,
  Navigation,
  Heading,
  NavButtonConroller,
  UsersContainer,
  UserItem,
  UsersListContainer,
  RoomIdContainer,
  NavButton,
  MainContent,
  ChatContainer,
  MessagesContainer,
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
  const [localUser, setLocalUser] = useState({});
  const [activeUsers, setactiveUsers] = useState([]);
  const [messagesList, setmessagesList] = useState([]);
  const [renderEmojiContainer, setRenderEmojiContainer] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const localUserData = JSON.parse(localStorage.getItem("WeChatUser"));
    setLocalUser(localUserData);
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
      //   socket = io("http://localhost:3010");

      socket.emit("joinRoom", {
        name: localUser.name,
        room: localUser.room,
        avatar: localUser.avatarImg,
      });

      socket.on("userConnected", (payload) => {
        setmessagesList((prevMessages) => [...prevMessages, payload]);
      });

      socket.on("userDisconnected", (payload) => {
        console.log(payload);
        setmessagesList((prevMessages) => [...prevMessages, payload]);
      });

      socket.on("messenger", (newMessage) => {
        setmessagesList((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on("roomUsers", (payload) => {
        setactiveUsers(payload.users);
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

    e.target.focus();
    setRenderEmojiContainer(false);
  };

  return (
    <HomeContainer>
      <Navigation>
        <Heading>We Chat</Heading>
        <RoomIdContainer>Room: {localUser.room}</RoomIdContainer>
        <NavButtonConroller>
          <NavButton
            title="Log out"
            onClick={() => {
              localStorage.clear("WeChatUser");
              props.history.replace("/auth");
            }}
          >
            <FiLogOut />
          </NavButton>
        </NavButtonConroller>
      </Navigation>

      <MainContent>
        <ChatContainer>
          <MessagesContainer
            ref={chatContainerRef}
            onClick={() => setRenderEmojiContainer(false)}
          >
            {messagesList.map((eachMessage, index) => {
              const sender = eachMessage.sender === localUser.name;
              return (
                <ChatItem key={index}>
                  {eachMessage.sender === "server" ? (
                    <GreetMessage key={index}>
                      {eachMessage.message}
                    </GreetMessage>
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
          </MessagesContainer>

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
                onClick={() =>
                  setRenderEmojiContainer((prevState) => !prevState)
                }
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
        </ChatContainer>

        <UsersContainer>
          <p>Active Users</p>
          <UsersListContainer>
            {activeUsers.map((eachUser, index) => {
              return (
                <UserItem key={index}>
                  <img src={eachUser.avatar} alt="avatar" />
                  <p>{eachUser.name}</p>
                </UserItem>
              );
            })}
          </UsersListContainer>
        </UsersContainer>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
