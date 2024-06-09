import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import { AddChildTextType } from "./ModalContentType";
import surveyText from "../../../../Assets/TextData/surveyText";

function AddChildSurvey() {
  const textData: object | undefined = surveyText.find(
    (data) => data.type === "addChild"
  );

  const { message } = textData as AddChildTextType;

  return (
    <section>
      <ChatboxSystem messages={message.name} highlightWords="아이 이름" />
      <ChatboxUser messages="아이 이름" highlightWords="아이 이름" />
      <ChatboxSystem
        messages={message.birthDate}
        highlightWords="생년월일"
        selectbox={true}
      />
      <ChatboxUser messages="생년월일" highlightWords="생년월일" />
      <ChatboxSystem
        messages={message.characteristic}
        highlightWords="성격 또는 성향"
      />
      <ChatboxUser messages="성격" highlightWords="성격" />
    </section>
  );
}

export default AddChildSurvey;
