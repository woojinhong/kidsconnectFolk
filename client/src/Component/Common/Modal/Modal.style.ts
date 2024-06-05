import styled from "styled-components";
import { Modal } from "@mantine/core";

export const StyledModalHeader = styled(Modal.Header)`
  padding: 24px 32px 16px;
  border-bottom: 1px solid #c1c1c1;

  & h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const StyledModalCloseButton = styled(Modal.CloseButton)`
  &:hover {
    background-color: transparent;
    transform: rotate(90deg);
    transition: 0.3s;
  }
`;

export const StyledChatInput = styled.div`
  display: flex;
  gap: 16px;
  padding: 8px 32px;
  border-top: 1px solid #c1c1c1;

  & button {
    height: 48px !important;
  }
`;

export const StyledAddChildButton = styled.button`
  width: 268px;
  height: 186px;
  border-radius: 16px;
  background-color: #f2f2f2;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & img {
    width: 56px;
    height: 56px;
    margin-bottom: 16px;
  }
  & span {
    font-size: 14px;
    font-weight: 500;
  }
`;
