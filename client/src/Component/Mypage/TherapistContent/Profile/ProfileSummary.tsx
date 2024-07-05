import { useState } from "react";

import InputFile from "../../../Common/Input/InputFile";
import { ProfileType } from "./ProfileType";

import ProfileImg from "../../../../Assets/Image/ImgProfileTeacher.svg";
import IconReview from "../../../../Assets/Image/IconReview.svg";

import {
  StyledProfileSummaryContainer,
  StyledProfileImgContainer,
  StyledProfileTextContainer,
} from "../../../../Pages/Mypage/Mypage.style";

function ProfileSummary({
  therapistInfo,
  button = false,
  getData,
}: {
  therapistInfo: ProfileType;
  button?: boolean;
  getData?: (url: string) => void;
}) {
  const {
    firstName,
    lastName,
    freelancer,
    centerName,
    phoneNum,
    address,
    addressDetail,
  } = therapistInfo;
  const [uploadedImgUrl, setUploadedImgUrl] = useState<File | null>(null);

  const getUploadedProfileImg = (file: File | File[] | null) => {
    if (file && Array.isArray(file)) {
      setUploadedImgUrl(file[0]);
      getData && getData(URL.createObjectURL(file[0]));
    }
  };

  return (
    <StyledProfileSummaryContainer>
      <div>
        <StyledProfileImgContainer>
          <img
            src={
              uploadedImgUrl ? URL.createObjectURL(uploadedImgUrl) : ProfileImg
            }
            alt="프로필 이미지"
          />
        </StyledProfileImgContainer>
        <StyledProfileTextContainer>
          <h4>
            {lastName}
            {firstName}
            <span>선생님</span>
          </h4>
          <div className="review">
            <img src={IconReview} />
            <span>0.0</span>
          </div>
          <div>
            <span>{phoneNum}</span>
          </div>
          <span>
            {freelancer ? "프리랜서" : centerName} <i>근무 중</i>
          </span>
        </StyledProfileTextContainer>
      </div>
      {button ? (
        <div>
          <InputFile
            placeholder="프로필 수정"
            onChange={getUploadedProfileImg}
            showValue={false}
          />
        </div>
      ) : null}
    </StyledProfileSummaryContainer>
  );
}

export default ProfileSummary;
