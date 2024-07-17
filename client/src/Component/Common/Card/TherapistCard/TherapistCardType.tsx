import { StyledButtonWrapper } from "./TherapistCard.style";
import FilledButton from "../../Button/FilledButton";
import OutlineButton from "../../Button/OutlineButton";

export type TherapistCardProps = {
  variants: "default" | "applied" | "summary";
  therapistId?: number | undefined;
  onClose?: () => void;
  isOpen?: boolean;
  onOpen?: () => void;
};

export type TherapistProfileType = {
  firstName: string;
  lastName: string;
  phoneNum: string;
  address: string;
  addressDetail: string;
  freelancer: boolean;
  status: boolean;
  centerName: string;
};

export type TherapistDetailedInfoType = {
  title: string;
  bio: string;
  content: string;
  imageFile?: string;
  certificate: string[];
  ageRange: string[];
  symptom: string[];
  experience: experienceType[];
  education: educationType[];
};

export type educationType = {
  id: number;
  education: string;
  major: string;
  degree: string;
  status: boolean;
};

export type experienceType = {
  id: number;
  place: string;
  years: number;
  months: number;
};
export type TherapistCareerType = {
  place: string;
  startDate: string;
  endDate: string;
};

export function showAppliedButtonByMatchingStatus(
  isMatched: boolean,
  hasReviewed: boolean
) {
  if (!isMatched) {
    return (
      <StyledButtonWrapper className="button_wrapper_applied">
        <FilledButton text="연락이 안돼요" backgroundColor="#F2F2F2" />
        <FilledButton text="매칭 완료했어요" />
      </StyledButtonWrapper>
    );
  } else if (isMatched && !hasReviewed) {
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
}
