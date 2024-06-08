import { StyledMain, StyledProfileSummary } from "./Profile.style";

import therapistInfo from "../../../../MockData/therapistInfoData.json";

import TherapistProfile from "../../../TherapistProfile/TherapistProfile";
import ProfileSummary from "./ProfileSummary";

function ProfileContent() {
  const userId = 1;
  const userDetailInfoById: object | undefined = therapistInfo.find(
    (data) => data.id === userId
  );

  return (
    <StyledMain>
      <section>
        <h3>내 프로필</h3>
        <StyledProfileSummary>
          <ProfileSummary button={true} />
        </StyledProfileSummary>
      </section>
      <section>
        <h3>자기 소개</h3>
        <div>
          <div>
            <div>
              <img />
              <h4>아직 자기 소개를 작성하지 않으셨어요!</h4>
              <span>
                자기 소개를 작성해야 부모님에게 내 프로필이 노출됩니다
              </span>
            </div>
            <button>자기 소개 작성하기</button>
          </div>
        </div>
        <TherapistProfile data={userDetailInfoById} />
      </section>
    </StyledMain>
  );
}

export default ProfileContent;
