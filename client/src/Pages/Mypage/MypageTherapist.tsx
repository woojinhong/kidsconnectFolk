import { useEffect } from "react";

import Navigation from "../../Component/Mypage/Navigation/Navigation";
import MatchingContent from "../../Component/Mypage/TherapistContent/Matching/MatchingContent";

import { StyledMypageLayout } from "../../Assets/StyledData/PageLayout.style";

function MypageTherapist() {
  function rootBackgroundColorChange() {
    return (document.body.style.backgroundColor = "#f2f2f2");
  }

  useEffect(() => {
    rootBackgroundColorChange();
  }, []);

  return (
    <StyledMypageLayout>
      <Navigation userType="therapist" />
      <MatchingContent />
    </StyledMypageLayout>
  );
}

export default MypageTherapist;
