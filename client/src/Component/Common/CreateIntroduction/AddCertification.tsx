import { useState } from "react";

import InputText from "../Input/InputText";
import FilledButton from "../Button/FilledButton";
import InputFile from "../Input/InputFile";

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
    <div>
      <div>
        <h4>자격증</h4>
        <p>자격증 사진을 첨부하셔야 인증 마크가 달려요.</p>
      </div>
      {certificationList.map((certification, index) => (
        <div key={certification}>
          <InputText
            inputType="certification"
            placeholder="자격증 검색"
            apiIcon="search"
            dispatch={(e) => updateCertificationData(index, e.target.value)}
          />
          <InputFile placeholder="자격증 추가하기" />
        </div>
      ))}
      <FilledButton text="+ 자격증 추가하기" onClick={addNewCertification} />
    </div>
  );
}

export default AddCertification;
