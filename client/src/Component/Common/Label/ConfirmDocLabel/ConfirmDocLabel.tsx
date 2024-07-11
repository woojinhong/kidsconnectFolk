import { StyledContainer } from "./ConfirmDocLabel.style";

import IdImg from "../../../../Assets/Image/ImgProfileTeacher.svg";
import CareerImg from "../../../../Assets/Image/CareerConfirm.svg";
import DocumentImg from "../../../../Assets/Image/Document.svg";
import CrimeCheckImg from "../../../../Assets/Image/CrimeCheckLabel.svg";

type ConfirmDocLabelProps = {
  type: "id" | "career" | "certificate" | "crimeCheck";
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
    } else if (type === "crimeCheck") {
      return CrimeCheckImg;
    }
  }
  function getText(type: string) {
    if (type === "id") {
      return "본인 확인";
    } else if (type === "career") {
      return "경력 확인";
    } else if (type === "certificate") {
      return "자격증 확인";
    } else if (type === "crimeCheck") {
      return "범죄 여부";
    }
  }
  return (
    <StyledContainer className={size}>
      <img src={getImg(type)} />
      <span>
        <strong>{getText(type)}</strong>
        {type == "crimeCheck" ? "확인" : null} 완료
      </span>
    </StyledContainer>
  );
}

export default ConfirmDocLabel;
