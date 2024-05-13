import { Link } from "react-router-dom";

import logo from "../../../Assets/Image/LogoKidsConnect.svg";
import imgProfile from "../../../Assets/Image/ImgProfile.svg";
import imgProfileTeacher from "../../../Assets/Image/ImgProfileTeacher.svg";
import notification from "../../../Assets/Image/Notification.svg";
import iconSearch from "../../../Assets/Image/IconSearch.svg";

function Header() {
  // 차후 globalLoginStatus, user의 usertype 등 받아와서 조건부 렌더링 해주기
  const globalLoginStatus: boolean = false;
  const userType: string = "parents";

  return (
    <header>
      <h1>
        <img src={logo} alt="키즈커넥트" />
      </h1>
      <div>
        <section>
          <Link to="/matching">
            <img src={iconSearch} />
            <button type="button">선생님 찾기</button>
          </Link>
          <Link to="/developer">
            <button type="button">서비스 소개</button>
          </Link>
        </section>
        {globalLoginStatus ? (
          <section>
            <div>
              <img src={notification} alt="알림" />
            </div>
            <div>
              <Link to="/mypage">
                <p>username</p>
                <span>{userType === "parents" ? "부모님" : "선생님"}</span>
                <img
                  src={userType === "parents" ? imgProfile : imgProfileTeacher}
                />
              </Link>
            </div>
          </section>
        ) : (
          <section>
            <button type="button">로그인</button>
            <button type="button">회원가입</button>
          </section>
        )}
      </div>
    </header>
  );
}

export default Header;
