import { Highlight } from "@mantine/core";

import { StyledChatboxUserBox } from "./Chatbox.style";

type ChatboxUserProps = {
  messages?: string;
  highlightWords?: string;
};

function ChatboxUser({ messages = "", highlightWords = "" }: ChatboxUserProps) {
  return (
    <StyledChatboxUserBox>
      <Highlight
        highlight={highlightWords}
        highlightStyles={{
          backgroundColor: "transparent",
          fontWeight: 700,
          color: "#fff",
        }}
      >
        {messages}
      </Highlight>
    </StyledChatboxUserBox>
  );
}

export default ChatboxUser;
