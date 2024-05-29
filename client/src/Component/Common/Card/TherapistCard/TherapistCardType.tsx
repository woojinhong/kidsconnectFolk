import { StyledButtonWrapper } from "./TherapistCard.style";
import FilledButton from "../../Button/FilledButton";

export type TherapistCardProps = {
  variants: "default" | "applied" | "summary";
  therapistId?: number | undefined;
};

export type TherapistProfileType = {
  firstName: string;
  lastName: string;
  phoneNum: string;
  address: string;
  addressDetail: string;
};
export type TherapistDetailedInfoType = {
  imageFile: string;
  content: string;
  review: number;
  treatmentArea: string[];
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
        <FilledButton text="리뷰 쓰기" />
      </StyledButtonWrapper>
    );
  } else {
    return (
      <StyledButtonWrapper>
        <FilledButton text="리뷰 쓰기" disabled={["disabledDark"]} />
      </StyledButtonWrapper>
    );
  }
}
