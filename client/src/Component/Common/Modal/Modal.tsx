import { useState, useCallback, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal as MantineModal, Input } from "@mantine/core";

import OutlineButton from "../Button/OutlineButton";
import FilledButton from "../Button/FilledButton";
import TherapistPreference from "./ModalContent/TherapistPreference";
import AddChildSurvey from "./ModalContent/AddChildSurvey";
import ApplicationQuestionary from "./ModalContent/ApplicationQuestionary";
import { changeInputEvent } from "../../../Assets/CommonType/EventType";

import {
  StyledModalHeader,
  StyledModalCloseButton,
  StyledChatInput,
  StyledAddChildButton,
} from "./Modal.style";

import Plus from "../../../Assets/Image/Plus.svg";
import IconRemove from "../../../Assets/Image/Icon/IconRemove.svg";
import ChatProfile from "../../../Assets/Image/ChatProfile.svg";

function Modal({
  content,
  buttonText,
  chatInput = false,
  buttonVariant = "filled",
  buttonIcon,
  onClose,
  onOpen,
  isOpen,
}: ModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [chatInputValue, setChatInputValue] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);

  const handleChatInputChange = (e: changeInputEvent) => {
    setChatInputValue(e.target.value);
  };

  const handleButtonSendOnClick = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);

  const onClearChatInput = () => {
    setChatInputValue("");
  };

  useEffect(() => {
    if (currentStep === 1 || currentStep === 4) {
      setSendButtonDisabled(false);
    } else {
      setSendButtonDisabled(true);
    }
  }, [currentStep]);

  return (
    <>
      <MantineModal.Root
        opened={isOpen ? isOpen : opened}
        onClose={onClose ? onClose : close}
        padding="24px 32px 40px 32px"
        size="480px"
      >
        <MantineModal.Overlay />
        <MantineModal.Content>
          <StyledModalHeader>
            <MantineModal.Title>
              <img src={ChatProfile} />
              키즈커넥트
            </MantineModal.Title>
            <StyledModalCloseButton icon={<img src={IconRemove} />} />
          </StyledModalHeader>
          <MantineModal.Body>
            {content === "addChild"
              ? getContentInModal(
                  content,
                  onClose,
                  onClearChatInput,
                  chatInputValue,
                  currentStep,
                  handleButtonSendOnClick,
                  setCurrentStep
                )
              : getContentInModal(content, onClose)}
          </MantineModal.Body>
          {chatInput ? (
            <StyledChatInput>
              <Input.Wrapper
                styles={{
                  root: {
                    flex: 1,
                  },
                }}
              >
                <Input
                  value={chatInputValue}
                  placeholder="텍스트를 입력해주세요"
                  onChange={handleChatInputChange}
                  size="48px"
                  styles={{
                    input: {
                      fontSize: "16px",
                      borderColor: "transparent",
                      padding: 0,
                    },
                  }}
                />
              </Input.Wrapper>
              <FilledButton
                text="전송하기"
                variant="m_filled"
                icon="send"
                onClick={handleButtonSendOnClick}
                disabled={sendButtonDisabled}
              />
            </StyledChatInput>
          ) : null}
        </MantineModal.Content>
      </MantineModal.Root>

      <div>
        {buttonVariant === "addChild" ? (
          <StyledAddChildButton onClick={onOpen ? onOpen : open}>
            <div>
              <img src={Plus} />
              <span>{buttonText}</span>
            </div>
          </StyledAddChildButton>
        ) : buttonVariant === "filled" ? (
          <FilledButton onClick={open} text={buttonText} icon={buttonIcon} />
        ) : (
          <OutlineButton onClick={onOpen ? onOpen : open} text={buttonText} />
        )}
      </div>
    </>
  );
}

export default Modal;

const getContentInModal = (
  type: "therapistPreference" | "addChild" | "apply",
  onClose?: () => void,
  onClearChatInput?: () => void,
  chatInputValue?: string,
  currentStep?: number,
  handleButtonSendOnClick?: () => void,
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>
) => {
  switch (type) {
    case "therapistPreference":
      return <TherapistPreference />;
    case "addChild":
      return (
        <AddChildSurvey
          chatInputValue={chatInputValue}
          onClose={onClose}
          currentStep={currentStep}
          onClearChatInput={onClearChatInput}
          handleButtonSendOnClick={handleButtonSendOnClick}
          setCurrentStep={setCurrentStep}
        />
      );
    case "apply":
      return <ApplicationQuestionary onClose={onClose} />;
    default:
      return null;
  }
};

type ModalProps = {
  content: "apply" | "addChild" | "therapistPreference";
  buttonText: string;
  chatInput?: boolean;
  buttonVariant?: "filled" | "outlined" | "addChild";
  buttonIcon?: "search" | undefined; //필요 시 버튼 아이콘 추가
  onClose?: (() => void) | undefined;
  isOpen?: boolean;
  onOpen?: (() => void) | undefined;
};
