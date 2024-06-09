import DefaultText from "../Button/DefaultText";
import FilledButton from "../Button/FilledButton";
import { Link } from "react-router-dom";

import {
  StyledHeader,
  StyledContentContainer,
  StyledLinkButton,
  StyledProfileContainer,
} from "./Header.style";

import logo from "../../../Assets/Image/LogoKidsConnect.svg";
import imgProfile from "../../../Assets/Image/ImgProfile.svg";
import imgProfileTeacher from "../../../Assets/Image/ImgProfileTeacher.svg";
import notification from "../../../Assets/Image/Notification.svg";

function Header() {
  // 차후 globalLoginStatus, user의 usertype 등 받아와서 조건부 렌더링 해주기
  const globalLoginStatus: boolean = false;
  const userType: string = "parents";

  return (
    <StyledHeader>
      <main>
        <h1>
          <Link to="/">
            <img src={logo} alt="키즈커넥트" />
          </Link>
        </h1>
        <StyledContentContainer>
          <section>
            <StyledLinkButton to="/matching">
              <DefaultText leftText="선생님 찾기" leftIcon="search" />
            </StyledLinkButton>
            <StyledLinkButton to="/developer">
              <DefaultText leftText="서비스 소개" />
            </StyledLinkButton>
          </section>
          {globalLoginStatus ? (
            <StyledProfileContainer>
              <div className="notification">
                <img src={notification} alt="알림" />
              </div>
              <div className="profile">
                <StyledLinkButton to="/mypage" className="mypage">
                  <h4>
                    김땡땡
                    <span>{userType === "parents" ? "부모님" : "선생님"}</span>
                  </h4>
                  <img
                    src={
                      userType === "parents" ? imgProfile : imgProfileTeacher
                    }
                  />
                </StyledLinkButton>
              </div>
            </StyledProfileContainer>
          ) : (
            <section>
              <StyledLinkButton to="/login">
                <DefaultText rightText="로그인" />
              </StyledLinkButton>
              <StyledLinkButton to="/signup" className="signup">
                <FilledButton variant="m_filled" text="회원가입" />
              </StyledLinkButton>
            </section>
          )}
        </StyledContentContainer>
      </main>
    </StyledHeader>
  );
}

export default Header;
