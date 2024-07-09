import InputText from "../../Common/Input/InputText";
import InputPassword from "../../Common/Input/InputPassword";
import InputDatePicker from "../../Common/Input/InputDatePicker";
import DaumPostCode from "./DaumPostModal/DaumPostCode";

import { changeInputEvent } from "../../../Assets/CommonType/EventType";
import {
  StyledInputContainer,
  StyledNameInputContainer,
  StyledDetailInfoContainer,
  StyledAddressContainer,
} from "../../../Pages/Membership/Membership.style";

function SignupParentsInput({
  handleChangeReducer,
  handleClickReducer,
  handleDateChangeReducer,
  handleInputChangeReducer,
}: SignupParentsInput) {
  return (
    <StyledInputContainer>
      <InputText inputType="email" dispatch={handleChangeReducer} />
      <InputPassword dispatch={handleChangeReducer} />
      <StyledNameInputContainer>
        <InputText
          label="성"
          dispatch={handleChangeReducer}
          placeholder="성 Last Name"
          showWithAsterisk={true}
        />
        <InputText
          label="이름"
          dispatch={handleChangeReducer}
          placeholder="이름 First Name"
          showWithAsterisk={true}
        />
      </StyledNameInputContainer>
      <StyledDetailInfoContainer>
        <InputDatePicker
          label="생년월일"
          placeholder="날짜 선택하기"
          icon={true}
          showWithAsterisk={true}
          dispatch={handleDateChangeReducer}
        />
        <InputText
          label="휴대폰 번호"
          dispatch={handleChangeReducer}
          placeholder="‘-’ 없이 번호만 써 주세요."
          inputType="phoneNum"
          showWithAsterisk={true}
        />
      </StyledDetailInfoContainer>
      <StyledAddressContainer>
        <DaumPostCode
          label="주소"
          placeholder="우리집 주소 찾기"
          dispatch={handleClickReducer}
          dispatchPostalCode={handleInputChangeReducer}
        />
        <InputText
          inputType="detailAddress"
          dispatch={handleChangeReducer}
          placeholder="상세 주소 입력하기"
        />
      </StyledAddressContainer>
    </StyledInputContainer>
  );
}

interface SignupParentsInput {
  handleChangeReducer: (e: changeInputEvent) => void;
  handleClickReducer: (category: string, inputValue: string) => void;
  handleDateChangeReducer: (inputValue: string) => void;
  handleInputChangeReducer: (inputValue: string) => void;
}
export default SignupParentsInput;
