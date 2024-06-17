import React, { useState, useEffect, useCallback } from "react";

import { useDelayChatbox } from "../../../../Services/CustomHooks";
import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import surveyText from "../../../../Assets/TextData/surveyText";
import { AddChildTextType } from "./ModalContentType";
import { useGetChildAge } from "../../../../Services/CustomHooks";

function AddChildSurvey({
  onClose,
  chatInputValue,
  currentStep,
  onClearChatInput,
  handleButtonSendOnClick,
  setCurrentStep,
}: AddChildSurveyProps) {
  const textData: object | undefined = surveyText.find(
    (data) => data.type === "addChild"
  );
  const { messages } = textData as AddChildTextType;

  const [conversation, setConversation] = useState<JSX.Element[]>([]);
  const [selectedBirthValue, setSelectedBirthValue] = useState<string>("");
  const [selectedTreatmentArea, setSelectedTreatmentArea] = useState<string[]>(
    []
  );

  const getBirthValue = (inputValue: string) => {
    setSelectedBirthValue(inputValue);
  };

  const getNeededTreatmentValue = (inputValue: string[]) => {
    setSelectedTreatmentArea(inputValue);
  };
  useEffect(() => {
    const initialConversation = [
      <ChatboxSystem
        key="putChildName"
        messages={messages.name}
        highlightWords="아이 이름"
      />,
    ];
    setConversation(initialConversation);
  }, [messages.name]);

  useEffect(() => {
    const addConversationStep = async () => {
      if (currentStep === 2) {
        getChildNameAnswer(chatInputValue as string);
        onClearChatInput && onClearChatInput();
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="selectChildBirthday"
            messages={messages.birthDate}
            highlightWords="생년월일"
            selectbox={true}
            getDateValue={getBirthValue}
          />,
        ]);
      } else if (currentStep === 3) {
        getChildBirthAnswer(selectedBirthValue as string);
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="putTreatmentNeeded"
            messages={messages.treatmentNeeded}
            highlightWords="어떤 도움"
            checkbox={true}
            getNeededCheckboxValue={getNeededTreatmentValue}
          />,
        ]);
      } else if (currentStep === 4) {
        getNeededTreatmentAnswer(selectedTreatmentArea);
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="putChildCharacteristic"
            messages={messages.characteristic}
            highlightWords="성격 또는 성향"
          />,
        ]);
      } else if (currentStep === 5) {
        getCharacteristicAnswer(chatInputValue as string);
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="loading"
            messages="매칭 중입니다!"
            highlightWords="매칭 중입니다!"
            animation={true}
          />,
        ]);
        handleCloseModal();
      }
    };
    addConversationStep();
  }, [currentStep, messages.birthDate, messages.characteristic]);

  useEffect(() => {
    if (selectedBirthValue !== "") {
      handleButtonSendOnClick && handleButtonSendOnClick();
    }
    if (selectedTreatmentArea.length > 0) {
      setCurrentStep && setCurrentStep(4);
    }
  }, [selectedBirthValue, selectedTreatmentArea, handleButtonSendOnClick]);

  const getChildNameAnswer = useCallback((inputValue: string) => {
    const answer = inputValue;
    setConversation((prev) => [
      ...prev,
      <ChatboxUser
        key="childNameAnswer"
        messages={answer}
        highlightWords={answer}
      />,
    ]);
  }, []);

  const getChildBirthAnswer = useCallback((inputValue: string) => {
    const answer = useGetChildAge(inputValue as string).toString();
    setConversation((prev) => [
      ...prev,
      <ChatboxUser
        key="childBirthAnswer"
        messages={answer}
        highlightWords={answer}
      />,
    ]);
  }, []);

  const getNeededTreatmentAnswer = useCallback((inputValue: string[]) => {
    const answer = inputValue as string[];
    setConversation((prev) => [
      ...prev,
      <ChatboxUser
        key="childTreatmentAnswer"
        messages={answer.join(", ")}
        highlightWords={answer.join(", ")}
      />,
    ]);
  }, []);

  const getCharacteristicAnswer = useCallback((inputValue: string) => {
    const answer = inputValue as string;
    setConversation((prev) => [
      ...prev,
      <ChatboxUser
        key="childCharacteristicAnswer"
        messages={answer}
        highlightWords={answer}
      />,
    ]);
  }, []);

  const handleCloseModal = useCallback(() => {
    onClose && onClose();
  }, []);

  return <section>{conversation}</section>;
}

export default AddChildSurvey;

interface AddChildSurveyProps {
  onClose?: () => void;
  chatInputValue?: string;
  currentStep?: number;
  onClearChatInput?: () => void;
  handleButtonSendOnClick?: () => void;
  setCurrentStep?: (value: number) => void;
}
