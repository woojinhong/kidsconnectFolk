import { StyledContainer } from "./ConfirmDocLabel.style";

import IdImg from "../../../../Assets/Image/ImgProfileTeacher.svg";
import CareerImg from "../../../../Assets/Image/CareerConfirm.svg";
import DocumentImg from "../../../../Assets/Image/Document.svg";

type ConfirmDocLabelProps = {
  type: "id" | "career" | "certificate";
  size?: "xs";
};
function ConfirmDocLabel({ type, size }: ConfirmDocLabelProps) {
  function getImg(type: string) {
    if (type === "id") {
      return IdImg;
    } else if (type === "career") {
      return CareerImg;
    } else if (type === "certificate") {
      return DocumentImg;
    }
  }
  function getText(type: string) {
    if (type === "id") {
      return "본인 확인 완료";
    } else if (type === "career") {
      return "경력 확인 완료";
    } else if (type === "certificate") {
      return "자격증 확인 완료";
    }
  }
  return (
    <StyledContainer className={size}>
      <img src={getImg(type)} />
      <span>{getText(type)}</span>
    </StyledContainer>
  );
}

export default ConfirmDocLabel;
