import { useState } from "react";

import Tag from "../../Component/Common/Tag/Tag";
import TherapistProfile from "../../Component/TherapistProfile/TherapistProfile";

import TherapistInfoData from "../../MockData/therapistInfoData.json";
import TherapistData from "../../MockData/therapistData.json";
import TherapistCareer from "../../MockData/therapistExperienceData.json";

import Modal from "../../Component/Common/Modal/Modal";
import { ProfileType } from "../../Component/Mypage/TherapistContent/Profile/ProfileType";
import {
  ProfileDetailType,
  ProfileCareerType,
} from "../../Component/Mypage/TherapistContent/Profile/ProfileType";

import IconReview from "../../Assets/Image/IconReview.svg";

import {
  StyledMainContainer,
  StyledProfileSummaryContainer,
  StyledTextSummaryContainer,
  StyledSymptomContainer,
  StyledNameContainer,
} from "./TherapistIntroduction.style";
import {
  StyledProfileImgContainer,
  StyledProfileTextContainer,
} from "../Mypage/Mypage.style";

function TherapistIntroduction() {
  // 나중에 therapist Id params로 받아오기
  const therapistId = 1;
  const therapistDataById: object | undefined = TherapistData.find(
    (data) => data.id === therapistId
  );
  const therapistInfoById: object | undefined = TherapistInfoData.find(
    (data) => data.id === therapistId
  );
  const therapistCareerById = TherapistCareer.find(
    (data) => data.therapistId === therapistId
  );

  const { firstName, lastName } = therapistDataById as ProfileType;
  const { imageFile, review, treatmentArea } =
    therapistInfoById as ProfileDetailType;
  const { place } = therapistCareerById as ProfileCareerType;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledMainContainer>
      <StyledProfileSummaryContainer style={{ padding: "40px 0" }}>
        <div>
          <StyledProfileImgContainer>
            <img src={imageFile} alt="프로필 이미지" />
          </StyledProfileImgContainer>
          <StyledProfileTextContainer style={{ marginLeft: "24px" }}>
            <StyledSymptomContainer>
              {treatmentArea.map((text, index) => (
                <Tag key={index} value={text} />
              ))}
            </StyledSymptomContainer>
            <StyledNameContainer>
              <h4>
                {firstName}
                {lastName}
                <span>선생님</span>
              </h4>
            </StyledNameContainer>
            <StyledTextSummaryContainer>
              <div className="review">
                <img src={IconReview} alt="리뷰 점수" />
                <span>{review}</span>
              </div>
              <div className="career">
                경력 <span>8년 6개월</span>
              </div>
              <div className="isWorking">
                <span>{place}</span> 근무 중
              </div>
            </StyledTextSummaryContainer>
          </StyledProfileTextContainer>
        </div>
        <div style={{ width: "128px" }}>
          <Modal
            buttonText="연결해주세요"
            content="apply"
            buttonVariant="outlined"
            onClose={closeModal}
            isOpen={isModalOpen}
            onOpen={openModal}
          />
        </div>
      </StyledProfileSummaryContainer>
      <section>
        <TherapistProfile data={therapistInfoById} />
      </section>
    </StyledMainContainer>
  );
}

export default TherapistIntroduction;
