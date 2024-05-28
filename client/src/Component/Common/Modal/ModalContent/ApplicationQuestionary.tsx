import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import surveyText from "../../../../Assets/TextData/surveyText";
import { ApplicationTextType } from "./ModalContentType";

function ApplicationQuestionary() {
  const textData: object | undefined = surveyText.find(
    (data) => data.type === "application"
  );

  const {
    messages,
    selectChild,
    selectLocation,
    selectParams,
    toHome,
    toHistory,
  } = textData as ApplicationTextType;

  return (
    <section>
      <ChatboxSystem
        messages={messages.childSelect}
        button={selectChild}
        highlightWords="아이"
      />
      <ChatboxUser messages="아이" highlightWords="아이" />
      <ChatboxSystem
        messages={messages.careLocation}
        button={selectLocation}
        highlightWords="어디서 도움"
      />
      <ChatboxUser
        messages="집에서 받고 싶어요!"
        highlightWords="집에서 받고 싶어요!"
      />
      <ChatboxSystem
        messages={messages.done}
        button={selectParams}
        highlightWords={messages.done}
      />
    </section>
  );
}

export default ApplicationQuestionary;
