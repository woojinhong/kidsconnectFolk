import { clickButtonEvent } from "../../../Assets/CommonType/EventType";
import { StyledNavigation, getButtonStyles } from "./Navigation.style";

function Navigation({
  userType = "parents",
  handleNavMenu,
  clickedNavMenu,
}: {
  userType?: "parents" | "therapist";
  clickedNavMenu?: string;
  handleNavMenu: (e: clickButtonEvent) => void;
}) {
  const isClickedNavMenu = (menu: string): boolean => {
    if (menu === clickedNavMenu) {
      return true;
    } else return false;
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
      <button type="button">로그아웃</button>
    </StyledNavigation>
  );
}

export default Navigation;

const menuOnParents = ["내 정보", "신청한 매칭"];
const menuOnTherapist = ["내 정보", "매칭", "리뷰"];
