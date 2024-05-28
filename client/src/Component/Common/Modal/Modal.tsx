import { useDisclosure } from "@mantine/hooks";
import { Modal as MantineModal, Input } from "@mantine/core";

import OutlineButton from "../Button/OutlineButton";
import FilledButton from "../Button/FilledButton";
import {
  StyledModalHeader,
  StyledModalCloseButton,
  StyledChatInput,
} from "./Modal.style";

import IconRemove from "../../../Assets/Image/Icon/IconRemove.svg";
import ChatProfile from "../../../Assets/Image/ChatProfile.svg";

type ModalProps = {
  content: () => JSX.Element;
  chatInput?: boolean;
  buttonVariant?: "filled" | "outlined";
  buttonText: string;
};

function Modal({
  content,
  chatInput = false,
  buttonVariant = "filled",
  buttonText,
}: ModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <MantineModal.Root
        opened={opened}
        onClose={close}
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
          <MantineModal.Body>{content()}</MantineModal.Body>
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
        {buttonVariant === "filled" ? (
          <FilledButton onClick={open} text={buttonText} />
        ) : (
          <OutlineButton onClick={open} text={buttonText} />
        )}
      </div>
    </>
  );
}

export default Modal;
