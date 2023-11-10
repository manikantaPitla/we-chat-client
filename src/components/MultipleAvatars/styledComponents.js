import styled from "styled-components";

export const RetryBtn = styled.button`
  border-radius: 4px;
  border: none;
  outline: none;
  height: 38px;
  width: 100px;
  margin: 10px 0px;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  background-image: var(--m-gradient);
  box-shadow: 0px 0px 1px #252525;
  border-radius: 3px;
  box-shadow: 5px 5px 6px #bababa, -5px -5px 6px #ffffff;
`;

export const Avatar = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  height: 100px;
  width: 100px;
  padding: 6px;
  border-radius: 50%;

  img {
    width: 100%;
  }
`;

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  p {
    font-size: 12px;
    text-align: center;
    font-weight: 500;
  }
`;
