import { useState, useEffect } from "react";

import InputText from "../Input/InputText";
import FilledButton from "../Button/FilledButton";
import InputFile from "../Input/InputFile";
import {
  CategoryType,
  licenseType,
} from "../../../Pages/CreateIntroduction/CreateIntroductionType";
import { v4 as uuidv4 } from "uuid";

function AddCertification({
  getData,
}: {
  getData: (category: CategoryType, data: licenseType[]) => void;
}) {
  const [certificationList, setCertificationList] = useState<licenseType[]>([
    intialCertificationState,
  ]);

  const addNewCertification = () => {
    setCertificationList((prev) => [...prev, { id: uuidv4(), licenseId: "" }]);
  };

  const updateCertificationData = (
    index: number,
    updatedData: Partial<licenseType>
  ) => {
    setCertificationList((prev) => {
      const newList = [...prev];
      newList[index] = { ...newList[index], ...updatedData };
      return newList;
    });
  };

  useEffect(() => {
    if (certificationList.length > 0) {
      getData("licenses", certificationList);
    }
  }, [certificationList]);

  return (
    <div>
      <div>
        <h4>자격증</h4>
        <p>자격증 사진을 첨부하셔야 인증 마크가 달려요.</p>
      </div>
      {certificationList.map((certification, index) => (
        <div key={certification.id}>
          <InputText
            inputType="certification"
            placeholder="자격증 검색"
            apiIcon="search"
            dispatch={(e) =>
              updateCertificationData(index, { licenseId: e.target.value })
            }
          />
          <InputFile placeholder="자격증 추가하기" />
        </div>
      ))}
      <FilledButton text="+ 자격증 추가하기" onClick={addNewCertification} />
    </div>
  );
}

export default AddCertification;

const intialCertificationState: licenseType = {
  id: uuidv4(),
  licenseId: "",
};
