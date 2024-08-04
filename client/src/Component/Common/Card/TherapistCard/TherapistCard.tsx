import { useState, useEffect } from "react";
import Tag from "../../Tag/Tag";
import Modal from "../../Modal/Modal";
import FilledButton from "../../Button/FilledButton";
import OutlineButton from "../../Button/OutlineButton";

import {
  useGetTherapistById,
  useGetTherapistInfoById,
} from "../../../../Services/ApiHooks";
import {
  StyledLink,
  StyledTherapistCardContainer,
  StyledTagWrapper,
  StyledProfileWrapper,
  StyledContentWrapper,
  StyledTherapistDetailContainer,
  StyledButtonWrapper,
} from "./TherapistCard.style";
import {
  TherapistCardProps,
  TherapistProfileType,
  TherapistDetailedInfoType,
} from "./TherapistCardType";

import ProfileTherapist from "../../../../Assets/Image/ImgProfileTeacher.svg";
import IconReview from "../../../../Assets/Image/IconReview.svg";

function TherapistCard({ variants, therapistId }: TherapistCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [therapistData, setTherapistData] = useState<TherapistProfileType>();
  const [therapistInfo, setTherapistInfo] =
    useState<TherapistDetailedInfoType>();
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
      if (therapistId) {
        setTherapistData(await getTherapistById(therapistId));
      }
    };
    fetchTherapistData();
  }, []);

  useEffect(() => {
    const fetchTherapistInfo = async () => {
      if (therapistData && therapistId && therapistData.status) {
        setTherapistInfo(await getTherapistInfoById(therapistId));
      }
    };
    fetchTherapistInfo();
  }, [therapistData]);

  if (!therapistData || !therapistInfo) {
    return null;
  }

  return (
    <StyledLink to={`/therapist/${therapistId}`}>
      <StyledTherapistCardContainer className={variants}>
        <StyledTagWrapper>
          {therapistInfo.symptom.map((tag) => (
            <Tag key={tag} value={tag} />
          ))}
        </StyledTagWrapper>
        <StyledProfileWrapper
          className={variants === "summary" ? "profile_summary" : ""}
        >
          <div className="profile_wrapper">
            <img
              src={
                therapistInfo.imageFile
                  ? therapistInfo.imageFile
                  : ProfileTherapist
              }
            />
            <ul>
              <li className="profile_name">
                <span>
                  {therapistData.lastName}
                  {therapistData.firstName}
                </span>
                선생님
              </li>
              <li className="profile_career">
                {therapistInfo.experience.map((career) => (
                  <div>
                    <span key={career.id}>
                      <strong>경력</strong>
                      {career.years}년 {career.months}개월
                    </span>
                    {therapistData.centerName.length > 0 ? (
                      <i>{therapistData.centerName} 근무 중</i>
                    ) : (
                      <i>프리랜서로 근무 중</i>
                    )}
                  </div>
                ))}
              </li>
            </ul>
          </div>
          <div className="profile_review">
            <img src={IconReview} alt="리뷰 점수" />
            <span>0</span>
          </div>
        </StyledProfileWrapper>
        {variants === "pending" || variants === "confirmed" ? null : (
          <StyledContentWrapper
            className={variants === "summary" ? "content_summary" : ""}
          >
            <p>{therapistInfo.content}</p>
          </StyledContentWrapper>
        )}
        {variants === "pending" || variants === "confirmed" ? (
          <StyledTherapistDetailContainer>
            <li>
              📍위치
              <span>
                {therapistData.address}
                {therapistData.addressDetail}
              </span>
            </li>
            <li>
              📞전화번호<span>{therapistData.phoneNum}</span>
            </li>
          </StyledTherapistDetailContainer>
        ) : null}
        {variants === "default" ? (
          <StyledButtonWrapper>
            <Modal
              buttonText="연결해주세요"
              content="apply"
              buttonVariant="outlined"
              onClose={closeModal}
              isOpen={isModalOpen}
              onOpen={openModal}
              therapistId={therapistId}
            />
          </StyledButtonWrapper>
        ) : null}
        {variants === "pending" || variants === "confirmed"
          ? showAppliedButtonByMatchingStatus(variants)
          : null}
      </StyledTherapistCardContainer>
    </StyledLink>
  );
}

export default TherapistCard;

const showAppliedButtonByMatchingStatus = (
  variants: "pending" | "confirmed"
) => {
  if (variants === "pending") {
    return (
      <StyledButtonWrapper className="button_wrapper_applied">
        <FilledButton text="연락이 안돼요" backgroundColor="#f2f2f2" />
        <FilledButton text="매칭 완료했어요" />
      </StyledButtonWrapper>
    );
  } else if (variants === "confirmed") {
    return (
      <StyledButtonWrapper>
        <OutlineButton text="리뷰 쓰기" />
      </StyledButtonWrapper>
    );
  } else {
    return (
      <StyledButtonWrapper>
        <OutlineButton text="리뷰 쓰기" disabled={true} />
      </StyledButtonWrapper>
    );
  }
};

const handleConfirmMatchButton = () => {
  // TODO: 매칭 완료 버튼 클릭 시, 매칭 상태를 변경하는 API 호출
};
