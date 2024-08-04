import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";

import DefaultText from "../Button/DefaultText";
import FilledButton from "../Button/FilledButton";

import {
  useGetParentInfo,
  useGetTherapistInfo,
} from "../../../Services/ApiHooks";

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
  const loginStatus = useSelector((state: RootState) => state.loginStatus);
  const [parentName, setParentName] = useState<string>("");
  const [therapistName, setTherapistName] = useState<string>("");

  const { getParentInfo } = useGetParentInfo();
  const { getTherapistInfo } = useGetTherapistInfo();

  useEffect(() => {
    if (loginStatus.isLogin) {
      if (loginStatus.userType === "parents") {
        const fetchParentInfo = async () => {
          const response = await getParentInfo();
          setParentName(`${response.lastName}${response.firstName}`);
        };
        fetchParentInfo();
      } else {
        const fetchTherapistInfo = async () => {
          const response = await getTherapistInfo();
          setTherapistName(`${response.lastName}${response.firstName}`);
        };
        fetchTherapistInfo();
      }
    }
  }, [loginStatus, getParentInfo, getTherapistInfo]);
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
          {loginStatus.isLogin ? (
            <StyledProfileContainer>
              <div className="notification">
                <img src={notification} alt="알림" />
              </div>
              <div className="profile">
                <StyledLinkButton
                  to={`/mypage/${loginStatus.userType === "parents" ? "p" : "t"}`}
                  className="mypage"
                >
                  <h4>
                    {loginStatus.userType === "parents"
                      ? parentName
                      : therapistName}
                    <span>
                      {loginStatus.userType === "parents" ? "부모님" : "선생님"}
                    </span>
                  </h4>
                  <img
                    src={
                      loginStatus.userType === "parents"
                        ? imgProfile
                        : imgProfileTeacher
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
