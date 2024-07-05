import { useState } from "react";

import InputFile from "../../../Common/Input/InputFile";
import { ProfileType } from "./ProfileType";

import ProfileImg from "../../../../Assets/Image/ImgProfileTeacher.svg";
import IconReview from "../../../../Assets/Image/IconReview.svg";

function ProfileSummary({
  therapistInfo,
  button = false,
  getData,
}: {
  therapistInfo: ProfileType;
  button?: boolean;
  getData?: (file: File) => void;
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
      getData && getData(file[0]);
    }
  };

  return (
    <div>
      <div>
        <img
          src={
            uploadedImgUrl ? URL.createObjectURL(uploadedImgUrl) : ProfileImg
          }
          alt="프로필 이미지"
        />
      </div>
      <div>
        <h4>
          {lastName}
          {firstName}
        </h4>
        <div>
          <img src={IconReview} />
          <span>0.0</span>
        </div>
        <div>
          <strong>
            {address}
            {addressDetail}
          </strong>
          <span>{phoneNum}</span>
        </div>
        <span>{freelancer ? "프리랜서" : centerName} 근무 중</span>
      </div>
      {button ? (
        <div>
          <InputFile
            placeholder="프로필 수정"
            onChange={getUploadedProfileImg}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ProfileSummary;
