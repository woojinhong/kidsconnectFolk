import OutlineButton from "../../../Common/Button/OutlineButton";

import {
  ProfileType,
  ProfileDetailType,
  ProfileCareerType,
} from "./ProfileType";

import therapistProfileData from "../../../../MockData/therapistData.json";
import therapistCareer from "../../../../MockData/therapistExperienceData.json";
import therapistInfo from "../../../../MockData/therapistInfoData.json";

import IconReview from "../../../../Assets/Image/IconReview.svg";

function ProfileSummary({ button = false }: { button?: boolean }) {
  const userId = 1;
  const userCareerById = therapistCareer.find(
    (data) => data.therapistId === userId
  );
  const userProfileById = therapistProfileData.find(
    (data) => data.id === userId
  );
  const userDetailInfoById: object | undefined = therapistInfo.find(
    (data) => data.id === userId
  );

  const { firstName, lastName } = userProfileById as ProfileType;
  const { imageFile, review } = userDetailInfoById as ProfileDetailType;
  const { place } = userCareerById as ProfileCareerType;
  return (
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
      {button ? (
        <div>
          <OutlineButton variant="m_outline" text="프로필 수정" />
        </div>
      ) : null}
    </div>
  );
}

export default ProfileSummary;
