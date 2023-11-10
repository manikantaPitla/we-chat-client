import styled from "styled-components";

export const Main = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-image: var(--m-gradient);
`;

export const Card = styled.div`
  width: 420px;
  border-radius: 4px;
  box-shadow: 0px 0px 4px #252525;
  padding: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 80%;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Heading = styled.h1`
  font-size: 26px;
  font-weight: 500;
  font-family: "Belanosima", sans-serif;
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 4px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.4);
  height: 38px;
  padding: 10px;
  margin: 10px 0px;
  font-size: 14px;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const FormBtn = styled.button`
  border-radius: 4px;
  border: none;
  outline: none;
  height: 38px;
  margin: 10px 0px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  background-image: var(--m-gradient);
  box-shadow: 0px 0px 1px #252525;
  border-radius: 3px;
  box-shadow: 5px 5px 6px #bababa, -5px -5px 6px #ffffff;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const AvatarContainer = styled.button`
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0px;
  color: #e81cff;

  border: none;
  outline: none;
  background-color: transparent;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export const NoUserImg = styled.img`
  width: 70px;
`;

export const PopUpBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  }

  .avatar-list {
    min-height: 250px;
    height: fit-content;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  .popup-btn-container {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      flex-grow: 2;
      border-radius: 4px;
      border: none;
      outline: none;
      height: 38px;
      margin: 10px 0px;
      width: 100%;
      font-size: 12px;
      font-weight: 500;
      color: #ffffff;
      background-image: var(--m-gradient);
      box-shadow: 0px 0px 1px #252525;
      border-radius: 3px;
      box-shadow: 5px 5px 6px #bababa, -5px -5px 6px #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .selected-avatar {
      border: 1px solid #252525 !important;
      background-color: red !important;
    }
  }
`;
