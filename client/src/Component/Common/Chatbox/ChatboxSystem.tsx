import { Highlight } from "@mantine/core";
import OutlineButton from "../Button/OutlineButton";

import { StyledChatboxSystemBox, StyledButtonWrapper } from "./Chatbox.style";

type ChatboxSystemProps = {
  highlightWords?: string;
  messages?: string;
  button?: string[];
};

function ChatboxSystem({
  highlightWords = "",
  messages = "",
  button = [],
}: ChatboxSystemProps) {
  return (
    <StyledChatboxSystemBox>
      <Highlight
        highlight={highlightWords}
        color="transparent"
        highlightStyles={{
          fontWeight: 700,
        }}
      >
        {messages}
      </Highlight>
      <StyledButtonWrapper
        className={messages.includes("선생님 성별") ? "gender_buttons" : ""}
      >
        {button?.map((text) => {
          return (
            <OutlineButton
              key={text}
              text={text}
              variant="m_outline"
              borderColor="#c1c1c1"
            ></OutlineButton>
          );
        })}
      </StyledButtonWrapper>
    </StyledChatboxSystemBox>
  );
}

export default ChatboxSystem;
