import { useDisclosure } from "@mantine/hooks";
import { Modal as MantineModal, Input } from "@mantine/core";

import OutlineButton from "../Button/OutlineButton";
import FilledButton from "../Button/FilledButton";
import TherapistPreference from "./ModalContent/TherapistPreference";
import AddChildSurvey from "./ModalContent/AddChildSurvey";
import ApplicationQuestionary from "./ModalContent/ApplicationQuestionary";

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

  const getContentInModal = (
    type: "therapistPreference" | "addChild" | "apply",
    props?: () => void
  ) => {
    switch (type) {
      case "therapistPreference":
        return <TherapistPreference />;
      case "addChild":
        return <AddChildSurvey />;
      case "apply":
        return <ApplicationQuestionary onClose={props} />;
      default:
        return null;
    }
  };

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
            {getContentInModal(content, onClose)}
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
                  placeholder="텍스트를 입력해주세요"
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
              <FilledButton text="전송하기" variant="m_filled" icon="send" />
            </StyledChatInput>
          ) : null}
        </MantineModal.Content>
      </MantineModal.Root>

      <div>
        {buttonVariant === "addChild" ? (
          <StyledAddChildButton onClick={open}>
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

export default Modal;
