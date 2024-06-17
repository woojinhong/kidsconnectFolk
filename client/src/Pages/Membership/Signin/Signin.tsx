import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { emailRegex, passwordRegex } from "../Signup/Signup";
import InputText from "../../../Component/Common/Input/InputText";
import InputPassword from "../../../Component/Common/Input/InputPassword";
import FilledButton from "../../../Component/Common/Button/FilledButton";
import UserTypeCheckbox from "../../../Component/Membership/UserTypeCheckbox";
import { changeInputEvent } from "../../../Assets/CommonType/EventType";

function Signin() {
  const [selectedUserType, setSelectedUserType] = useState<string>("parents");
  const [postDataValue, setPostDataValue] = useState(initialPostData);
  const isFormInvalid = validateCommonFields(postDataValue);

  useEffect(() => {
    if (selectedUserType === "parents") {
      setPostDataValue({ ...postDataValue, userType: "parents" });
    } else if (selectedUserType === "therapist") {
      setPostDataValue({ ...postDataValue, userType: "therapist" });
    }
  }, [selectedUserType]);

  const handleChangeReducer = (e: changeInputEvent) => {
    const { name, value } = e.target;
    setPostDataValue({ ...postDataValue, [name]: value });
  };

  return (
    <main>
      <div>
        <h2>🔑 로그인</h2>
        <span>
          가입을 안 하셨나요? <Link to="/signup">회원가입 하기</Link>
        </span>
      </div>
      <section>
        <div>
          <h3>회원 유형</h3>
          <span>가입했던 회원 유형을 선택 후 로그인해 주세요</span>
          <form>
            <UserTypeCheckbox onClick={setSelectedUserType} />
            <div>
              <InputText inputType="email" dispatch={handleChangeReducer} />
              <InputPassword dispatch={handleChangeReducer} />
              <FilledButton text="로그인" disabled={isFormInvalid} />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signin;

const validateCommonFields = (data: PostDataType) => {
  const isEmailValid = emailRegex.test(data.email);
  const isPasswordValid = passwordRegex.test(data.password);

  return data.email && data.password && isEmailValid && isPasswordValid
    ? false
    : true;
};

const initialPostData: PostDataType = {
  userType: "",
  email: "",
  password: "",
};

interface PostDataType {
  userType: string;
  email: string;
  password: string;
}
