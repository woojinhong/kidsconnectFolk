import ChatboxSystem from "../../Chatbox/ChatboxSystem";
import ChatboxUser from "../../Chatbox/ChatboxUser";

import surveyText from "../../../../Assets/TextData/surveyText";
import { PreferenceTextType } from "./ModalContentType";

function TherapistPreference() {
  const textData: object | undefined = surveyText.find(
    (data) => data.type === "preference"
  );
  const { messages, selectGender, selectCareer } =
    textData as PreferenceTextType;

  return (
    <section>
      <ChatboxSystem messages={messages.intro} highlightWords="선생님 매칭" />
      <ChatboxSystem
        messages={messages.gender}
        highlightWords="선생님 성별"
        button={selectGender}
      />
      <ChatboxUser messages="네" highlightWords="네" />
      <ChatboxSystem
        messages={messages.career}
        highlightWords="경력"
        button={selectCareer}
      />
      <ChatboxUser messages="네" highlightWords="네" />
      <ChatboxSystem
        messages={messages.loading}
        highlightWords={messages.loading}
        animation={true}
      />
    </section>
  );
}

export default TherapistPreference;
