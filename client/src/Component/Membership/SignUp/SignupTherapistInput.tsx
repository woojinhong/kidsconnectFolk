import { useState } from "react";
import { Checkbox, Radio } from "@mantine/core";

import DaumPostCode from "./DaumPostModal/DaumPostCode";
import InputText from "../../Common/Input/InputText";
import InputPassword from "../../Common/Input/InputPassword";
import InputDatePicker from "../../Common/Input/InputDatePicker";
import { changeInputEvent } from "../../../Assets/CommonType/EventType";

function SignupTherapistInput({
  handleChangeReducer,
  handleClickReducer,
  handleDateChangeReducer,
  handleInputChangeReducer,
  handleIsFreelancer,
}: SignupTherapistInputProps) {
  const [isFreelancer, setIsFreelancer] = useState<boolean>(false);
  const [genderChecked, setGenderChecked] = useState<boolean>(false);

  const handleIsFreelancerCheckbox = (event: changeInputEvent) => {
    setIsFreelancer(event.currentTarget.checked);
    handleIsFreelancer(event);
  };

  const handleGenderRadio = (event: changeInputEvent) => {
    setGenderChecked(event.currentTarget.checked);
    handleChangeReducer(event);
  };

  return (
    <div>
      <InputText inputType="email" dispatch={handleChangeReducer} />
      <InputPassword dispatch={handleChangeReducer} />
      <div>
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
        <Radio.Group label="성별" required={true}>
          <Radio
            name="gender"
            label="여성"
            checked={genderChecked}
            value="여성"
            onChange={handleGenderRadio}
          />
          <Radio
            name="gender"
            label="남성"
            checked={genderChecked}
            value="남성"
            onChange={handleGenderRadio}
          />
        </Radio.Group>
      </div>
      <div>
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
      </div>
      <div>
        <div>
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
        </div>
      </div>
      <div>
        <Checkbox
          label="프리랜서로 일하고 있어요"
          checked={isFreelancer}
          onChange={handleIsFreelancerCheckbox}
        />
        <DaumPostCode
          label="근무지 찾기"
          placeholder="센터/기관/병원 찾기"
          dispatch={handleClickReducer}
          disabled={isFreelancer ? true : false}
        />
      </div>
    </div>
  );
}

export default SignupTherapistInput;

interface SignupTherapistInputProps {
  handleChangeReducer: (e: changeInputEvent) => void;
  handleClickReducer: (category: string, inputValue: string) => void;
  handleDateChangeReducer: (inputValue: string) => void;
  handleInputChangeReducer: (inputValue: string) => void;
  handleIsFreelancer: (e: changeInputEvent) => void;
}
