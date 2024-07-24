import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Tag from "../../Component/Common/Tag/Tag";
import TherapistProfile from "../../Component/TherapistProfile/TherapistProfile";
import Modal from "../../Component/Common/Modal/Modal";

import {
  useGetTherapistById,
  useGetTherapistInfoById,
} from "../../Services/ApiHooks";

import {
  TherapistProfileType,
  TherapistDetailedInfoType,
} from "../../Component/Common/Card/TherapistCard/TherapistCardType";

import IconReview from "../../Assets/Image/IconReview.svg";
import ProfileImg from "../../Assets/Image/ImgProfileTeacher.svg";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [therapistData, setTherapistData] = useState<TherapistProfileType>();
  const [therapistInfo, setTherapistInfo] =
    useState<TherapistDetailedInfoType>();

  const { id } = useParams<string>();
  const { getTherapistById } = useGetTherapistById();
  const { getTherapistInfoById } = useGetTherapistInfoById();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchTherapistData = async () => {
      setTherapistData(await getTherapistById(Number(id)));
      setTherapistInfo(await getTherapistInfoById(Number(id)));
    };
    if (id) fetchTherapistData();
  }, []);

  if (!therapistData || !therapistInfo) {
    return <div>선생님 데이터를 불러오지 못했어요!</div>;
  }

  return (
    <StyledMainContainer>
      <StyledProfileSummaryContainer style={{ padding: "40px 0" }}>
        <div>
          <StyledProfileImgContainer>
            <img
              src={
                therapistInfo.imageFile ? therapistInfo.imageFile : ProfileImg
              }
              alt="프로필 이미지"
            />
          </StyledProfileImgContainer>
          <StyledProfileTextContainer style={{ marginLeft: "24px" }}>
            <StyledSymptomContainer>
              {therapistInfo.symptom.map((tag) => (
                <Tag key={tag} value={tag} />
              ))}
            </StyledSymptomContainer>
            <StyledNameContainer>
              <h4>
                {therapistData.lastName}
                {therapistData.firstName}
                <span>선생님</span>
              </h4>
            </StyledNameContainer>
            <StyledTextSummaryContainer>
              <div className="review">
                <img src={IconReview} alt="리뷰 점수" />
                <span>리뷰필요</span>
              </div>
              <div className="career">
                경력 <span>8년 6개월</span>
              </div>
              {therapistData.freelancer ? (
                <div className="isWorking">
                  <span>프리랜서</span> 근무 중
                </div>
              ) : (
                <div className="isWorking">
                  <span>{therapistData.centerName}</span> 근무 중
                </div>
              )}
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
            therapistId={Number(id)}
          />
        </div>
      </StyledProfileSummaryContainer>
      <section>
        <TherapistProfile therapistId={Number(id)} />
      </section>
    </StyledMainContainer>
  );
}

export default TherapistIntroduction;
