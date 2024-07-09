import { useState, useEffect, useCallback } from "react";

import { useDelayChatbox } from "../../../../Services/CustomHooks";
import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import surveyText from "../../../../Assets/TextData/surveyText";
import {
  AddChildTextType,
  GatheredChildDataType,
  AddChildSurveyProps,
} from "./ModalContentType";
import { useGetChildAge } from "../../../../Services/CustomHooks";
import { usePostChild } from "../../../../Services/ApiHooks";

import { StyledModalContentContainer } from "../Modal.style";

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
  const { messages, selectGender } = textData as AddChildTextType;

  const [gatheredChildData, setGatheredChildData] =
    useState<GatheredChildDataType>({} as GatheredChildDataType);
  const [selectedGenderValue, setSelectedGenderValue] = useState<string>("");
  const [conversation, setConversation] = useState<JSX.Element[]>([]);
  const [selectedBirthValue, setSelectedBirthValue] = useState<string>("");
  const [selectedTreatmentArea, setSelectedTreatmentArea] = useState<string[]>(
    []
  );

  const getBirthValue = (inputValue: string) => {
    const date = new Date(inputValue);
    inputValue && setSelectedBirthValue(inputValue);
    setGatheredChildData((prev) => {
      return {
        ...prev,
        dateOfBirth: date.toISOString().split("T")[0],
      };
    });
  };

  const getNeededTreatmentValue = (inputValue: string[]) => {
    setSelectedTreatmentArea(inputValue);
    setGatheredChildData((prev) => {
      return {
        ...prev,
        symptomName: inputValue,
      };
    });
  };

  const getGenderValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answerToEnglish = e.currentTarget.textContent === "남아" ? "M" : "F";
    setSelectedGenderValue(e.currentTarget.textContent as string);
    setGatheredChildData((prev) => {
      return {
        ...prev,
        gender: answerToEnglish,
      };
    });
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
            key="selectGender"
            messages={messages.gender}
            highlightWords="아이의 성별"
            button={selectGender}
            onClick={getGenderValue}
          />,
        ]);
      } else if (currentStep === 3) {
        getChildGenderAnswer(selectedGenderValue as string);
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
      } else if (currentStep === 4) {
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
      } else if (currentStep === 5) {
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
      } else if (currentStep === 6) {
        getCharacteristicAnswer(chatInputValue as string);
        setCurrentStep && setCurrentStep(7);
      } else if (currentStep === 7) {
        usePostChild(gatheredChildData);
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="loading"
            messages="등록 중입니다!"
            highlightWords="등록 중입니다!"
            animation={true}
          />,
        ]);
        handleCloseModal();
      }
    };
    addConversationStep();
  }, [
    currentStep,
    messages.birthDate,
    messages.characteristic,
    messages.gender,
  ]);

  useEffect(() => {
    if (selectedGenderValue !== "") {
      setCurrentStep && setCurrentStep(3);
    }
    if (selectedBirthValue !== "") {
      setCurrentStep && setCurrentStep(4);
    }
    if (selectedTreatmentArea.length > 0) {
      setCurrentStep && setCurrentStep(5);
    }
  }, [
    selectedBirthValue,
    selectedTreatmentArea,
    handleButtonSendOnClick,
    selectedGenderValue,
  ]);

  const getChildNameAnswer = useCallback((inputValue: string) => {
    const answer = inputValue;
    const firstName = answer.slice(0, 1);
    const lastName = answer.slice(1, answer.length);
    setGatheredChildData((prev) => {
      return {
        ...prev,
        firstName: firstName,
        lastName: lastName,
      };
    });
    setConversation((prev) => [
      ...prev,
      <ChatboxUser
        key="childNameAnswer"
        messages={answer}
        highlightWords={answer}
      />,
    ]);
  }, []);

  const getChildGenderAnswer = useCallback((inputValue: string) => {
    const answer = inputValue;
    setConversation((prev) => [
      ...prev,
      <ChatboxUser
        key="childGenderAnswer"
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
    setGatheredChildData((prev) => {
      return {
        ...prev,
        personality: answer,
      };
    });
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

  return (
    <StyledModalContentContainer>{conversation}</StyledModalContentContainer>
  );
}

export default AddChildSurvey;
