import { useState } from "react";
import { Link } from "react-router-dom";
import InputText from "../../../Component/Common/Input/InputText";
import InputPassword from "../../../Component/Common/Input/InputPassword";
import FilledButton from "../../../Component/Common/Button/FilledButton";
import UserTypeCheckbox from "../../../Component/Membership/UserTypeCheckbox";

function Signin() {
  const [userType, setUserType] = useState("부모님");

  const handleUserType = (userType: string) => {
    setUserType(userType);
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
            <UserTypeCheckbox handleUserType={handleUserType} />
            <div>
              <InputText inputType="email" />
              <InputPassword />
              <FilledButton text="로그인" />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signin;
