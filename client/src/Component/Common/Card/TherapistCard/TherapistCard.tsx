import { useState } from "react";
import Tag from "../../Tag/Tag";

import OutlineButton from "../../Button/OutlineButton";
import { useCareerDateCalc } from "../../../../Services/CustomHooks";
import {
  StyledTherapistCardContainer,
  StyledTagWrapper,
  StyledProfileWrapper,
  StyledContentWrapper,
  StyledTherapistDetailContainer,
  StyledButtonWrapper,
} from "./TherapistCard.style";
import {
  TherapistCardProps,
  TherapistDetailedInfoType,
  TherapistCareerType,
  showAppliedButtonByMatchingStatus,
} from "./TherapistCardType";

import TherapistDetailedInfo from "../../../../MockData/therapistInfoData.json";
import TherapistProfile from "../../../../MockData/therapistData.json";
import TherapistCareer from "../../../../MockData/therapistExperienceData.json";

import IconReview from "../../../../Assets/Image/IconReview.svg";

function TherapistCard({ type }: TherapistCardProps) {
  // 추후 api 추가 시 변경 가능, isMatched, hasReviewed 값 = 임의 값
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);

  const { id, firstName, lastName, phoneNum, address, addressDetail } =
    TherapistProfile[0];

  const therapistDetailedInfoById = TherapistDetailedInfo.find(
    (therapist) => therapist.id === id
  );
  const { imageFile, content, review, treatmentArea } =
    therapistDetailedInfoById as TherapistDetailedInfoType;

  const therapistCareerById = TherapistCareer.find(
    (career) => career.therapistId === id
  );
  const { place, startDate, endDate } =
    therapistCareerById as TherapistCareerType;

  return (
    <StyledTherapistCardContainer className={type}>
      <StyledTagWrapper>
        {treatmentArea.map((tag) => (
          <Tag key={tag} value={tag} />
        ))}
      </StyledTagWrapper>
      <StyledProfileWrapper
        className={type === "summary" ? "profile_summary" : ""}
      >
        <div className="profile_wrapper">
          <img src={imageFile} />
          <ul>
            <li className="profile_name">
              <span>
                {lastName}
                {firstName}
              </span>
              선생님
            </li>
            {startDate && endDate ? (
              <li className="profile_career">
                경력
                <span>{useCareerDateCalc(startDate, endDate)}</span>
              </li>
            ) : null}
            {place ? (
              <li className="profile_current_career">{place} 근무중</li>
            ) : null}
          </ul>
        </div>
        <div className="profile_review">
          <img src={IconReview} alt="리뷰 점수" />
          <span>{review}</span>
        </div>
      </StyledProfileWrapper>
      {type === "applied" ? null : (
        <StyledContentWrapper
          className={type === "summary" ? "content_summary" : ""}
        >
          <p>{content}</p>
        </StyledContentWrapper>
      )}
      {type === "applied" ? (
        <StyledTherapistDetailContainer>
          <li>
            📍위치
            <span>
              {address}
              {addressDetail}
            </span>
          </li>
          <li>
            📞전화번호<span>{phoneNum}</span>
          </li>
        </StyledTherapistDetailContainer>
      ) : null}
      {type === "default" ? (
        <StyledButtonWrapper>
          <OutlineButton text="연결해주세요" />
        </StyledButtonWrapper>
      ) : null}
      {type === "applied"
        ? showAppliedButtonByMatchingStatus(isMatched, hasReviewed)
        : null}
    </StyledTherapistCardContainer>
  );
}

export default TherapistCard;
