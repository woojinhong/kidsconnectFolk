import Category from "../Common/Category/Category";
import ConfirmDocLabel from "../Common/Label/ConfirmDocLabel/ConfirmDocLabel";
import CheckBoxAgeBox from "../Common/CheckBox/CheckBoxAge/CheckBoxAgeBox";

import { TherapistDetailedInfoType } from "../Common/Card/TherapistCard/TherapistCardType";
import {
  useSymptomMatchEmoji,
  useDescriptionMatchAgeRange,
  useAmountExperience,
} from "../../Services/CustomHooks";

import {
  StyledPortfolioContainer,
  StyledContentContainer,
  StyledSymptomContainer,
  StyledCareerContainer,
  StyledAgeRangeContainer,
  StyledEducationContainer,
  StyledCheckDocContainer,
} from "./TherapistProfile.style";

import CareerConfirmLabel from "../../Assets/Image/CareerConfirm.svg";
import EducationConfirmLabel from "../../Assets/Image/Document.svg";

function TherapistProfile({ data }: { data?: object }) {
  const {
    title,
    bio,
    content,
    education,
    symptom,
    experience,
    certificate,
    ageRange,
  } = data as TherapistDetailedInfoType;

  return (
    <StyledPortfolioContainer>
      <h3>{title}</h3>
      <StyledContentContainer>
        <div>
          <h4>자기 소개</h4>
          <p>{bio}</p>
        </div>
        <div>
          <h4>
            <span>도울 수 있는</span> 치료/교육/재활 영역
          </h4>
          <StyledSymptomContainer>
            {symptom.map((tag) => (
              <Category
                emoji={useSymptomMatchEmoji(tag)}
                key={tag}
                text={tag}
                checkbox={false}
                size="lg"
              />
            ))}
          </StyledSymptomContainer>
        </div>
        <StyledAgeRangeContainer>
          <h4>
            <span>도울 수 있는</span> 아이 연령
          </h4>
          <div>
            {ageRange
              ? ageRange.map((data) => (
                  <CheckBoxAgeBox
                    key={data}
                    label={data}
                    description={useDescriptionMatchAgeRange(data)}
                    checkedData={[data]}
                  />
                ))
              : null}
          </div>
        </StyledAgeRangeContainer>
        {experience ? (
          <StyledCareerContainer>
            <h4>경력</h4>
            <div>
              총 <span>{useAmountExperience(experience)}</span>
            </div>
            <ul>
              {experience.map((data) => (
                <li key={data.id}>
                  {data.place}
                  <span>
                    {data.years}년 {data.months}개월
                  </span>
                  <img src={CareerConfirmLabel} />
                </li>
              ))}
            </ul>
          </StyledCareerContainer>
        ) : null}
        {education ? (
          <div>
            <h4>학력</h4>
            <ul>
              {education.map((data) => (
                <li key={data.id}>
                  <strong>{data.education} </strong>
                  {data.major} {data.degree} {data.status ? "졸업" : "재학"}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {certificate ? (
          <StyledEducationContainer>
            <h4>자격증</h4>
            <ul>
              {certificate.map((data) => (
                <li key={data}>
                  {data} <img src={EducationConfirmLabel} />
                </li>
              ))}
            </ul>
          </StyledEducationContainer>
        ) : null}
        <div>
          <h4>상세 소개</h4>
          <p>{content}</p>
        </div>
        <StyledCheckDocContainer>
          <h4>기타 인증</h4>
          <div>
            <ConfirmDocLabel type="id" />
            <ConfirmDocLabel type="crimeCheck" />
          </div>
        </StyledCheckDocContainer>
      </StyledContentContainer>
    </StyledPortfolioContainer>
  );
}

export default TherapistProfile;
