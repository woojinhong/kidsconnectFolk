import Navigation from "../../Component/Mypage/Navigation/Navigation";
import ProfileContent from "../../Component/Mypage/ParentsContent/Profile/ProfileContent";
import MatchingContent from "../../Component/Mypage/ParentsContent/Matching/MatchingContent";

import { StyledMypageLayout } from "../../Assets/StyledData/PageLayout.style";

function MypageParents() {
  return (
    <StyledMypageLayout>
      <Navigation userType="therapist" />
      <ProfileContent />
      <MatchingContent />
    </StyledMypageLayout>
  );
}

export default MypageParents;
