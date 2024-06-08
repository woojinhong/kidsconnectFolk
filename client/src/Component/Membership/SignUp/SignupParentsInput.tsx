import InputText from "../../Common/Input/InputText";
import InputPassword from "../../Common/Input/InputPassword";

function SignupParentsInput() {
  return (
    <div>
      <InputText inputType="email" />
      <InputPassword />
      <div>
        <InputText label="성" />
        <InputText label="이름" />
      </div>
      <div>
        <InputText label="생년월일" />
        <InputText label="휴대폰 번호" />
      </div>
      <InputText label="주소" />
      <InputText />
    </div>
  );
}

export default SignupParentsInput;
