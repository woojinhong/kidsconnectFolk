import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useDelayChatbox } from "../../../../Services/CustomHooks";
import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import surveyText from "../../../../Assets/TextData/surveyText";
import { ApplicationTextType } from "./ModalContentType";

function ApplicationQuestionary({ onClose }: { onClose?: () => void }) {
  const textData: object | undefined = surveyText.find(
    (data) => data.type === "application"
  );

  const {
    messages,
    selectChild,
    selectLocation,
    selectParams,
    toMypage,
    toHistory,
  } = textData as ApplicationTextType;

  const [appliedOptionData, setAppliedOptionData] = useState<object>({});
  const [conversation, setConversation] = useState<JSX.Element[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const initialConversation = [
      <ChatboxSystem
        key="childSelect"
        messages={messages.childSelect}
        button={selectChild}
        highlightWords="어떤 아이가 도움"
        onClick={getChildSelectAnswer}
      />,
    ];
    setConversation(initialConversation);
    setCurrentStep(1);
  }, [messages.childSelect]);

  useEffect(() => {
    const addConversationStep = async () => {
      if (currentStep === 2) {
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="selectLocation"
            messages={messages.careLocation}
            highlightWords="어디서 도움"
            button={selectLocation}
            onClick={getLocationAnswer}
          />,
        ]);
      } else if (currentStep === 3) {
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="done"
            messages={messages.done}
            highlightWords="신청 완료"
            button={selectParams}
            onClick={goToSelectedParams}
          />,
        ]);
      }
    };
    addConversationStep();
  }, [
    currentStep,
    selectLocation,
    selectParams,
    messages.careLocation,
    messages.done,
  ]);

  const getChildSelectAnswer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const answer = event.currentTarget.textContent as string;
      if (answer === "+ 아이 등록하기") {
        navigate("/mypage/p");
      } else {
        setAppliedOptionData({ childId: answer });
        setConversation((prev) => [
          ...prev,
          <ChatboxUser
            key="child-answer"
            messages={answer}
            highlightWords={answer}
          />,
        ]);
      }
      setCurrentStep(2);
    },
    []
  );

  const getLocationAnswer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const answer = event.currentTarget.textContent as string;
      setAppliedOptionData({ location: answer });
      setConversation((prev) => [
        ...prev,
        <ChatboxUser
          key="location-answer"
          messages={answer}
          highlightWords={answer}
        />,
      ]);
      setCurrentStep(3);
    },
    []
  );

  const goToSelectedParams = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const answer = event.currentTarget.textContent as string;
      if (answer === selectParams[0]) {
        onClose && onClose();
      } else {
        navigate("/mypage/p");
      }
    },
    [selectParams, toMypage, toHistory]
  );

  return <section>{conversation}</section>;
}

export default ApplicationQuestionary;
