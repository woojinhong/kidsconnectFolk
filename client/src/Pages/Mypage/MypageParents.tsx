import { useState, useEffect } from "react";

import Navigation from "../../Component/Mypage/Navigation/Navigation";
import ProfileContent from "../../Component/Mypage/ParentsContent/Profile/ProfileContent";
import MatchingContent from "../../Component/Mypage/ParentsContent/Matching/MatchingContent";

import { clickButtonEvent } from "../../Assets/CommonType/EventType";
import { StyledMypageLayout } from "../../Assets/StyledData/PageLayout.style";
import { useGetParentInfo } from "../../Services/ApiHooks";

function MypageParents() {
  const [clickedNavMenu, setClickedNavMenu] = useState<string>(
    initialClickedNavMenu
  );
  const { getParentInfo } = useGetParentInfo();

  const handleNavMenuClick = (e: clickButtonEvent) => {
    setClickedNavMenu(e.currentTarget.innerText);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await getParentInfo();
    };
    fetchUserData();
  });

  return (
    <StyledMypageLayout>
      <Navigation
        userType="parents"
        handleNavMenu={handleNavMenuClick}
        clickedNavMenu={clickedNavMenu}
      />
      {clickedNavMenu === "내 정보" ? <ProfileContent /> : <MatchingContent />}
    </StyledMypageLayout>
  );
}

export default MypageParents;

const initialClickedNavMenu: string = "내 정보";
