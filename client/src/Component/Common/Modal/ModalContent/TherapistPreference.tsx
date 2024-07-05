import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import { useDelayChatbox } from "../../../../Services/CustomHooks";
import { matchingSurveyActions } from "../../../../Store/Slices/MatchingSurveySlice";

import surveyText from "../../../../Assets/TextData/surveyText";
import { PreferenceTextType } from "./ModalContentType";

import { StyledModalContentContainer } from "../Modal.style";

function TherapistPreference() {
  const textData: PreferenceTextType | undefined = surveyText.find(
    (data) => data.type === "preference"
  ) as PreferenceTextType;

  const { messages, selectGender, selectCareer } = textData;

  const [conversation, setConversation] = useState<JSX.Element[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initialConversation = [
      <ChatboxSystem
        key="intro"
        messages={messages.intro}
        highlightWords="선생님 매칭"
      />,
    ];
    setConversation(initialConversation);
    setCurrentStep(1);
  }, [messages.intro]);

  useEffect(() => {
    const addConversationStep = async () => {
      if (currentStep === 1) {
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="selectGender"
            messages={messages.gender}
            highlightWords="선생님 성별"
            button={selectGender}
            onClick={getGenderPreferenceAnswer}
          />,
        ]);
      } else if (currentStep === 2) {
        await useDelayChatbox(500);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="selectCareer"
            messages={messages.career}
            highlightWords="경력"
            button={selectCareer}
            onClick={getCareerPreferenceAnswer}
          />,
        ]);
      } else if (currentStep === 3) {
        await useDelayChatbox(500);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="loading"
            messages={messages.loading}
            highlightWords={messages.loading}
            animation={true}
          />,
        ]);
        setCurrentStep(4);
      } else if (currentStep === 4) {
        navigate("/matching");
      }
    };

    addConversationStep();
  }, [
    currentStep,
    messages.gender,
    messages.career,
    messages.loading,
    selectGender,
    selectCareer,
  ]);

  const getCareerPreferenceAnswer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const answer = event.currentTarget.textContent as string;
      const answerToBoolean: boolean = answer === "네" ? true : false;
      dispatch(matchingSurveyActions.setCareerPreference(answerToBoolean));
      setConversation((prev) => [
        ...prev,
        <ChatboxUser
          key="career-answer"
          messages={answer}
          highlightWords={answer}
        />,
      ]);
      setCurrentStep(3);
    },
    [dispatch]
  );

  const getGenderPreferenceAnswer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const answer = event.currentTarget.textContent as string;
      const answerToData = (answer: string) => {
        if (answer === "상관 없어요!") {
          return "성별 무관";
        } else {
          return answer;
        }
      };
      dispatch(matchingSurveyActions.setGenderPreference(answerToData(answer)));
      setConversation((prev) => [
        ...prev,
        <ChatboxUser
          key="gender-answer"
          messages={answer}
          highlightWords={answer}
        />,
      ]);
      setCurrentStep(2);
    },
    [dispatch]
  );

  return (
    <StyledModalContentContainer>{conversation}</StyledModalContentContainer>
  );
}

export default TherapistPreference;
