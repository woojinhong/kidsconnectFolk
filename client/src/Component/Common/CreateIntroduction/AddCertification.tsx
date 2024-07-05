import { useState } from "react";

import InputText from "../Input/InputText";
import FilledButton from "../Button/FilledButton";
import InputFile from "../Input/InputFile";

import {
  StyledCommonContainer,
  StyledCertificateContainer,
} from "../../../Pages/CreateIntroduction/CreateIntroduction.style";
function AddCertification({
  getData,
}: {
  getData: (inputValue: string) => void;
}) {
  const [certificationList, setCertificationList] = useState<string[]>([""]);

  const addNewCertification = () => {
    setCertificationList((prev) => [...prev, ""]);
  };

  const updateCertificationData = (index: number, updatedData: string) => {
    setCertificationList((prev) => {
      const newList = [...prev];
      newList[index] = updatedData;
      return newList;
    });
    getData;
  };

  return (
    <StyledCommonContainer>
      <div>
        <h4>자격증</h4>
        <p>자격증 사진을 첨부하셔야 인증 마크가 달려요.</p>
      </div>
      {certificationList.map((certification, index) => (
        <StyledCertificateContainer key={certification}>
          <InputText
            inputType="certification"
            placeholder="자격증 검색"
            apiIcon="search"
            dispatch={(e) => updateCertificationData(index, e.target.value)}
          />
          <InputFile
            size="sm"
            height="56px"
            placeholder="자격증명서 첨부하기"
          />
        </StyledCertificateContainer>
      ))}
      <div style={{ width: "148px" }}>
        <FilledButton
          variant="m_filled"
          height="40px"
          text="+ 자격증 추가하기"
          onClick={addNewCertification}
        />
      </div>
    </StyledCommonContainer>
  );
}

export default AddCertification;
