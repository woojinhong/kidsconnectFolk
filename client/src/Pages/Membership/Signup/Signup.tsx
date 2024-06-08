import { useState } from "react";
import { Link } from "react-router-dom";

import SignupParentsInput from "../../../Component/Membership/SignUp/SignupParentsInput";
import SignupTherapistInput from "../../../Component/Membership/SignUp/SignupTherapistInput";
import UserTypeCheckbox from "../../../Component/Membership/UserTypeCheckbox";
import FilledButton from "../../../Component/Common/Button/FilledButton";

function Signup() {
  const [userType, setUserType] = useState("부모님");

  const handleUserType = (userType: string) => {
    setUserType(userType);
  };
  return (
    <main>
      <div>
        <h2>📝 회원가입</h2>
        <span>
          이미 가입한 회원이신가요? <Link to="/login">로그인 하기</Link>
        </span>
      </div>
      <section>
        <div>
          <h3>회원 유형</h3>
          <span>회원가입 유형을 선택 후 가입해 주세요</span>
          <form>
            <UserTypeCheckbox handleUserType={handleUserType} />
            {userType === "부모님" ? (
              <SignupParentsInput />
            ) : (
              <SignupTherapistInput />
            )}
            <FilledButton text="회원가입" />
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signup;
