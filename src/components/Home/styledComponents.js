import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
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

export const LogoutBtn = styled.button`
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
  flex-grow: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  /* max-height: 80vh; */
`;

export const ChatItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
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
  padding: 2px 10px;
`;

export const ChatInputContainer = styled.form`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
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
