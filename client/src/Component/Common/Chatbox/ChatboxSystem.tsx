import { useState } from "react";

import { Highlight } from "@mantine/core";
import { DateValue } from "@mantine/dates";
import OutlineButton from "../Button/OutlineButton";
import InputDatePicker from "../Input/InputDatePicker";

import {
  StyledChatboxSystemBox,
  StyledButtonWrapper,
  StyledAnimationContainer,
} from "./Chatbox.style";
import LoadingAnimation from "../../../Assets/Animation/Loading.gif";

interface ChatboxSystemProps {
  highlightWords?: string;
  messages?: string;
  button?: string[];
  selectbox?: boolean;
  animation?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  disabled?: boolean;
}

function ChatboxSystem({
  highlightWords = "",
  messages = "",
  button = [],
  animation = false,
  onClick,
  selectbox = false,
}: ChatboxSystemProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
      setIsDisabled(true);
    }
  };
  // 나중에 불러들일 데이터가 있을 때 사용
  const getDateValue = (date: string) => {
    console.log(date);
  };
  return (
    <StyledChatboxSystemBox>
      <Highlight
        highlight={highlightWords}
        color="transparent"
        highlightStyles={{
          fontWeight: 700,
        }}
      >
        {messages}
      </Highlight>
      {button ? (
        <StyledButtonWrapper
          className={messages.includes("선생님 성별") ? "gender_buttons" : ""}
          style={{ color: isDisabled ? "#999999" : "#333333" }}
        >
          {button.map((text) => {
            return (
              <OutlineButton
                key={text}
                text={text}
                variant="m_outline"
                borderColor="#c1c1c1"
                onClick={handleOnClick}
                disabled={isDisabled}
              ></OutlineButton>
            );
          })}
        </StyledButtonWrapper>
      ) : null}
      {selectbox ? (
        <InputDatePicker
          placeholder="날짜 선택하기"
          size="xs"
          dispatch={getDateValue}
        />
      ) : null}
      {animation ? (
        <StyledAnimationContainer>
          <img src={LoadingAnimation} alt="로딩 중" />
        </StyledAnimationContainer>
      ) : null}
    </StyledChatboxSystemBox>
  );
}

export default ChatboxSystem;
