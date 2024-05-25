import { StyledNavigation } from "./Navigation.style";

const menuOnParents = ["내 정보", "신청한 매칭"];
const menuOnTherapist = ["내 정보", "매칭", "리뷰"];

function Navigation({
  userType = "parents",
}: {
  userType?: "parents" | "therapist";
}) {
  return (
    <StyledNavigation>
      <ul>
        {userType === "parents"
          ? menuOnParents.map((menu, index) => <li key={index}>{menu}</li>)
          : menuOnTherapist.map((menu, index) => <li key={index}>{menu}</li>)}
      </ul>
      <span />
      <button type="button">로그아웃</button>
    </StyledNavigation>
  );
}

export default Navigation;
