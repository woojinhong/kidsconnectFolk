import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UseDispatch } from "react-redux";

import { loginStatusActions } from "../../../Store/Slices/LoginStatus";
import { clickButtonEvent } from "../../../Assets/CommonType/EventType";
import { StyledNavigation, getButtonStyles } from "./Navigation.style";
import { useDispatch } from "react-redux";

function Navigation({
  userType = "parents",
  handleNavMenu,
  clickedNavMenu,
}: {
  userType?: "parents" | "therapist";
  clickedNavMenu?: string;
  handleNavMenu: (e: clickButtonEvent) => void;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["token"]);
  const isClickedNavMenu = (menu: string): boolean => {
    if (menu === clickedNavMenu) {
      return true;
    } else return false;
  };

  const handleSignOutButton = (e: clickButtonEvent) => {
    // 아니야 removeCookie 사용해서 하자.;
    const loginStatusData = { userType, isLogin: false };
    removeCookie("token");
    dispatch(loginStatusActions.setLoginStatus(loginStatusData));
    navigate("/");
  };

  return (
    <StyledNavigation>
      <ul>
        {userType === "parents"
          ? menuOnParents.map((menu, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={handleNavMenu}
                  style={getButtonStyles(isClickedNavMenu(menu))}
                >
                  {menu}
                </button>
              </li>
            ))
          : menuOnTherapist.map((menu, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={handleNavMenu}
                  style={getButtonStyles(isClickedNavMenu(menu))}
                >
                  {menu}
                </button>
              </li>
            ))}
      </ul>
      <button type="button" onClick={handleSignOutButton}>
        로그아웃
      </button>
    </StyledNavigation>
  );
}

export default Navigation;

const menuOnParents = ["내 정보", "신청한 매칭"];
const menuOnTherapist = ["내 정보", "매칭", "리뷰"];
