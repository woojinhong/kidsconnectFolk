import OutlineButton from "../../../Common/Button/OutlineButton";
import { StyledMain, StyledProfileSummary } from "./Profile.style";
import {
  ProfileType,
  ProfileDetailType,
  ProfileCareerType,
} from "./ProfileType";

import therapistInfo from "../../../../MockData/therapistInfoData.json";
import therapistProfileData from "../../../../MockData/therapistData.json";
import therapistCareer from "../../../../MockData/therapistExperienceData.json";

import IconReview from "../../../../Assets/Image/IconReview.svg";
import TherapistProfile from "../../../TherapistProfile/TherapistProfile";

function ProfileContent() {
  const userId = 1;
  const userProfileById = therapistProfileData.find(
    (data) => data.id === userId
  );
  const userDetailInfoById: object | undefined = therapistInfo.find(
    (data) => data.id === userId
  );
  const userCareerById = therapistCareer.find(
    (data) => data.therapistId === userId
  );

  const { firstName, lastName } = userProfileById as ProfileType;
  const { imageFile, review } = userDetailInfoById as ProfileDetailType;
  const { place } = userCareerById as ProfileCareerType;

  return (
    <StyledMain>
      <section>
        <h3>내 프로필</h3>
        <StyledProfileSummary>
          <div>
            <div>
              <img src={imageFile} alt="프로필 이미지" />
            </div>
            <div>
              <h4>
                {firstName}
                {lastName}
              </h4>
              <div>
                <img src={IconReview} />
                {review}
              </div>
              <span>{place}근무 중</span>
            </div>
            <div>
              <OutlineButton variant="m_outline" text="프로필 수정" />
            </div>
          </div>
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
