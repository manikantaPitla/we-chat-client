import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Navigation = styled.nav`
  background-image: var(--m-gradient);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
`;

export const Heading = styled.h1`
  font-weight: 500;
  font-family: "Belanosima", sans-serif;
  font-size: 22px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
export const RoomIdContainer = styled.p`
  font-weight: 500;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px;
`;

export const NavButtonConroller = styled.div`
  display: flex;
  gap: 15px;
`;
export const NavButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 22px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const ChatContainer = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const MessagesContainer = styled.div`
  flex-grow: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  position: relative;
`;

export const UsersContainer = styled.div`
  padding: 10px;
  flex-shrink: 0;
  width: 300px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.2);

  p {
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 0px;
  }

  @media screen and (max-width: 768px) {
    border-left: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    padding: 5px 10px;

    p {
      display: none;
      padding: 0px;
    }
  }
`;
export const UsersListContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 768px) {
    padding: 6px;
    flex-direction: row;
  }
`;

export const UserItem = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  font-weight: 500;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-radius: 3px;
  flex-shrink: 0;

  img {
    width: 40px;
    flex-shrink: 0;
  }

  p {
    display: block;
    font-size: 14px;
    font-weight: 500;
  }

  @media screen and (max-width: 768px) {
    border-radius: 50px;
    padding: 6px 15px 6px 6px;

    img {
      width: 30px;
      flex-shrink: 0;
    }

    p {
      font-size: 12px;
      font-weight: 500;
    }
  }
`;

export const GreetMessage = styled.p`
  font-size: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  width: fit-content;
  color: #ffffff;
  padding: 6px 10px;
  border-radius: 50px;
  margin: auto;
`;

export const ChatItem = styled.div`
  display: flex;
  gap: 10px;
`;

export const ChatItemFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ChatUserFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
`;

export const ChatTime = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
`;

export const ChatUser = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.sender ? "#e81cff" : "#40c9ff")};
`;

export const UserAvatar = styled.img`
  width: 30px;
`;

export const ChatMessage = styled.p`
  font-size: 12px;
  font-weight: 500;
  border-left: 2px solid ${(props) => (props.sender ? "#e81cff" : "#40c9ff")};
  padding: 4px 10px;
`;

export const ChatInputContainer = styled.form`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  flex-shrink: 0;
`;

export const InputFlex = styled.main`
  flex-grow: 2;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const EmojiContainer = styled.div`
  position: absolute;
  bottom: 80px;
  /* box-shadow: 5px 5px 6px #bababa, -5px -5px 6px #ffffff; */
`;
export const EmojiBtn = styled.button`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: transparent;
  color: #000000;
  border: none;
  outline: none;
  height: 40px;
  width: 40px;
`;

export const ChatInput = styled.input`
  flex-grow: 2;
  height: 100%;
  padding: 8px 10px;
  border: none;
  outline: none;
`;

export const SendBtn = styled(EmojiBtn)`
  background-image: var(--m-gradient);
  color: #ffffff;
`;
