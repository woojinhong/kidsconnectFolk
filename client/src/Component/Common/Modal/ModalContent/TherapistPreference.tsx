import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import { useDelayChatbox } from "../../../../Services/CustomHooks";
import { matchingSurveyActions } from "../../../../Store/Slices/MatchingSurveySlice";

import surveyText from "../../../../Assets/TextData/surveyText";
import { PreferenceTextType } from "./ModalContentType";

function TherapistPreference() {
  const textData: PreferenceTextType | undefined = surveyText.find(
    (data) => data.type === "preference"
  ) as PreferenceTextType;

  const { messages, selectGender, selectCareer } = textData;

  const [conversation, setConversation] = useState<JSX.Element[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isGenderButtonDisabled, setIsGenderButtonDisabled] =
    useState<boolean>(false);
  const [isCareerButtonDisabled, setIsCareerButtonDisabled] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const initialConversation = [
      <ChatboxSystem
        key="intro"
        messages={messages.intro}
        highlightWords="선생님 매칭"
      />,
    ];
    setConversation(initialConversation);
    setCurrentStep(1); // Start with step 1 after the initial intro message
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
            disabled={isGenderButtonDisabled}
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
            disabled={isCareerButtonDisabled}
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
    isGenderButtonDisabled,
    isCareerButtonDisabled,
  ]);

  const getGenderPreferenceAnswer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      let answer = event.currentTarget.textContent as string;
      if (answer === "상관 없어요!") {
        return (answer = "전체");
      }
      dispatch(matchingSurveyActions.setGenderPreference(answer));
      setIsGenderButtonDisabled(true);
      setConversation((prev) => [
        ...prev,
        <ChatboxUser
          key="gender-answer"
          messages={answer}
          highlightWords={answer}
        />,
      ]);
      setCurrentStep(2); // Move to the next step
    },
    []
  );

  const getCareerPreferenceAnswer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const answer = event.currentTarget.textContent as string;
      const answerToBoolean: boolean = answer === "네" ? true : false;
      dispatch(matchingSurveyActions.setCareerPreference(answerToBoolean));
      setIsCareerButtonDisabled(true);
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
    []
  );

  return <section>{conversation}</section>;
}

export default TherapistPreference;
