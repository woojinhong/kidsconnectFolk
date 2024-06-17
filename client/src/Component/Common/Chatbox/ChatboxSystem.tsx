import React, { useState, useCallback, useEffect } from "react";

import { Highlight } from "@mantine/core";
import OutlineButton from "../Button/OutlineButton";
import FilledButton from "../Button/FilledButton";
import InputDatePicker from "../Input/InputDatePicker";
import Category from "../Category/Category";

import { clickButtonEvent } from "../../../Assets/CommonType/EventType";
import { getSelectedTreatmentArea } from "../../../Services/CustomHooks";
import {
  StyledChatboxSystemBox,
  StyledButtonWrapper,
  StyledAnimationContainer,
  StyledCheckboxContainer,
} from "./Chatbox.style";
import LoadingAnimation from "../../../Assets/Animation/Loading.gif";
import { treatmentNeededText } from "../../../Assets/TextData/treatmentAreaText";

function ChatboxSystem({
  highlightWords = "",
  messages = "",
  button = [],
  animation = false,
  onClick,
  selectbox = false,
  getDateValue,
  checkbox = false,
  setValue,
  getNeededCheckboxValue,
}: ChatboxSystemProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledCheckbox, setIsDisabledCheckbox] = useState(false);
  const [selectedTreatmentArea, setSelectedTreatmentArea] = useState<string[]>(
    []
  );

  const handleOnClick = (event: clickButtonEvent) => {
    if (onClick) {
      onClick(event);
      setIsDisabled(true);
    }
  };

  const handleDatePicker = (inputValue: string) => {
    getDateValue && getDateValue(inputValue as string);
    setIsDisabled(true);
  };

  const handleOnClickCheckbox = () => {
    if (getNeededCheckboxValue) {
      getNeededCheckboxValue(selectedTreatmentArea);
      setIsDisabledCheckbox(true);
    }
  };

  const getSelectedTreatmentArea = useCallback((text: string) => {
    setSelectedTreatmentArea((prev) => {
      if (prev.includes(text)) {
        return prev.filter((area) => area !== text);
      } else if (text === "진단 필요") {
        return [text];
      } else if (prev.includes("진단 필요")) {
        return [text];
      } else {
        return [...prev, text];
      }
    });
  }, []);

  useEffect(() => {
    setValue && setValue(selectedTreatmentArea);
  }, [selectedTreatmentArea]);

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
              />
            );
          })}
        </StyledButtonWrapper>
      ) : null}
      {selectbox ? (
        <InputDatePicker
          placeholder="날짜 선택하기"
          size="xs"
          dispatch={handleDatePicker}
          disabled={isDisabled}
        />
      ) : null}
      {checkbox ? (
        <StyledCheckboxContainer>
          {treatmentNeededText.map((category) => (
            <Category
              key={category.text}
              emoji={category.emoji}
              text={category.text}
              size="xxs"
              main={true}
              onClick={getSelectedTreatmentArea}
              checkedData={selectedTreatmentArea}
              disabled={isDisabledCheckbox}
            />
          ))}
          <FilledButton
            key="done"
            text="완료"
            variant="m_filled"
            onClick={handleOnClickCheckbox}
            disabled={isDisabledCheckbox}
          />
        </StyledCheckboxContainer>
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

interface ChatboxSystemProps {
  highlightWords?: string;
  messages?: string;
  button?: string[];
  checkbox?: boolean;
  selectbox?: boolean;
  animation?: boolean;
  onClick?: (event: clickButtonEvent) => void;
  disabled?: boolean;
  getDateValue?: (inputValue: string) => void;
  selectedValue?: string[];
  setValue?: React.Dispatch<React.SetStateAction<string[]>>;
  getNeededCheckboxValue?: (inputValue: string[]) => void;
}
