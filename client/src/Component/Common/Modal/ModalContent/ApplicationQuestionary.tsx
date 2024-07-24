import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useDelayChatbox } from "../../../../Services/CustomHooks";
import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import {
  useGetChildInfo,
  usePostMatchingSurvey,
} from "../../../../Services/ApiHooks";
import surveyText from "../../../../Assets/TextData/surveyText";
import { ApplicationTextType } from "./ModalContentType";
import { GatheredChildDataType } from "./ModalContentType";

import { StyledModalContentContainer } from "../Modal.style";

function ApplicationQuestionary({
  therapistId,
  onClose,
}: {
  therapistId: number | undefined;
  onClose?: () => void;
}) {
  const textData: object | undefined = surveyText.find(
    (data) => data.type === "application"
  );

  const { messages, selectLocation, selectParams, toMypage, toHistory } =
    textData as ApplicationTextType;

  const [appliedOptionData, setAppliedOptionData] =
    useState<AppliedOptionDataType>({} as AppliedOptionDataType);
  const [conversation, setConversation] = useState<JSX.Element[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [childData, setChildData] = useState<GatheredChildDataType[]>(
    [] as GatheredChildDataType[]
  );

  const selectChildList = ["+ 아이 등록하기"];
  const navigate = useNavigate();
  const { getChildInfo } = useGetChildInfo();
  const { postMatchingSurvey } = usePostMatchingSurvey();

  useEffect(() => {
    const getChildData = async () => {
      const data = await getChildInfo();
      setChildData(data);
    };
    getChildData();
    setAppliedOptionData((prev) => ({
      ...prev,
      therapistId: therapistId as number,
    }));
  }, []);

  useEffect(() => {
    if (childData.length > 0) {
      selectChildList.unshift(
        ...childData.map((child) => `${child.firstName}${child.lastName}`)
      );
    }
    const initialConversation = [
      <ChatboxSystem
        key="childSelect"
        messages={messages.childSelect}
        button={selectChildList}
        highlightWords="어떤 아이가 도움"
        onClick={getChildSelectAnswer}
      />,
    ];
    setConversation(initialConversation);
    setCurrentStep(1);
  }, [messages.childSelect, childData]);

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
        await postMatchingSurvey(appliedOptionData);
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
        setAppliedOptionData((prev) => ({
          ...prev,
          childId: 5,
        }));
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
      setAppliedOptionData((prev) => ({
        ...prev,
        location: switchLocationAnswerToEnglish(answer),
      }));
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

  return (
    <StyledModalContentContainer>{conversation}</StyledModalContentContainer>
  );
}

export default ApplicationQuestionary;

export type AppliedOptionDataType = {
  childId: number;
  therapistId: number;
  location: "therapist" | "home" | null;
};

const switchLocationAnswerToEnglish = (answer: string) => {
  switch (answer) {
    case "집에서 받고 싶어요!":
      return "home";
    case "선생님이 근무하는 곳으로 갈게요!":
      return "therapist";
    default:
      return null;
  }
};
