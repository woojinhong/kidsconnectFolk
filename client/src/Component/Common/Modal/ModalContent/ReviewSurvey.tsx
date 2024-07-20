import { useState, useEffect, useCallback } from "react";

import { useDelayChatbox } from "../../../../Services/CustomHooks";
import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";
import { usePostReview } from "../../../../Services/ApiHooks";

import surveyText from "../../../../Assets/TextData/surveyText";
import { StyledModalContentContainer } from "../Modal.style";

import {
  AddChildSurveyProps,
  ReviewTextType,
  ReviewDataType,
} from "./ModalContentType";

function ReviewSurvey({
  onClose,
  onClearChatInput,
  chatInputValue,
  currentStep,
  setCurrentStep,
}: AddChildSurveyProps) {
  const [gatheredReviewData, setGatheredReviewData] = useState<ReviewDataType>(
    {} as ReviewDataType
  );
  const [conversation, setConversation] = useState<JSX.Element[]>([]);
  const [rating, setRating] = useState<string>("");
  const textData: object | undefined = surveyText.find(
    (data) => data.type === "review"
  );
  const { messages } = textData as ReviewTextType;
  const { postReview } = usePostReview();

  const getRatingValue = (inputValue: string) => {
    setRating(inputValue);
    setGatheredReviewData((prev) => ({ ...prev, rating: Number(inputValue) }));
  };

  useEffect(() => {
    const initialConversation = [
      <ChatboxSystem
        key="rating"
        messages={messages.rating}
        highlightWords="선생님에게 리뷰"
        rating={true}
        getDateValue={getRatingValue}
      />,
    ];
    setConversation(initialConversation);
  }, []);

  useEffect(() => {
    const addConversationStep = async () => {
      if (currentStep === 2) {
        getRatingAnswer(rating);
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="comment"
            messages={messages.comment}
            highlightWords="상세한 리뷰를 남겨주세요."
          />,
        ]);
      } else if (currentStep === 3) {
        getCommentAnswer(chatInputValue as string);
        setGatheredReviewData((prev) => ({
          ...prev,
          comment: chatInputValue || "",
        }));
        onClearChatInput && onClearChatInput();
        setCurrentStep && setCurrentStep(4);
      } else if (currentStep === 4) {
        await postReview(gatheredReviewData, 1);
        await useDelayChatbox(1000);
        setConversation((prev) => [
          ...prev,
          <ChatboxSystem
            key="done"
            messages={messages.done}
            highlightWords="완료"
          />,
        ]);
        handleCloseModal();
      }
    };
    addConversationStep();
  }, [currentStep, messages.rating, messages.comment, messages.done]);

  useEffect(() => {
    if (rating !== "") {
      setCurrentStep && setCurrentStep(2);
    }
  }, [rating]);

  const getRatingAnswer = useCallback((inputValue: string) => {
    const answer = inputValue;
    setConversation((prev) => [
      ...prev,
      <ChatboxUser
        key="ratingAnswer"
        messages={answer}
        highlightWords={answer}
      />,
    ]);
    setCurrentStep && setCurrentStep(2);
  }, []);

  const getCommentAnswer = useCallback((inputValue: string) => {
    const answer = inputValue;
    onClearChatInput && onClearChatInput();
    setConversation((prev) => [
      ...prev,
      <ChatboxUser key="commentAnswer" messages={answer} />,
    ]);
    setCurrentStep && setCurrentStep(3);
  }, []);

  const handleCloseModal = useCallback(() => {
    onClose && onClose();
  }, []);

  return (
    <StyledModalContentContainer>{conversation}</StyledModalContentContainer>
  );
}

export default ReviewSurvey;
