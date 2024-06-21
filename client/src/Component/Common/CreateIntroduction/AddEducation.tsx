import { useState, useEffect } from "react";
import SelectBoxDefault from "../SelectBox/SelectBoxDefault";
import InputText from "../Input/InputText";
import FilledButton from "../Button/FilledButton";
import InputFile from "../Input/InputFile";

import {
  educationType,
  CategoryType,
} from "../../../Pages/CreateIntroduction/CreateIntroductionType";
import { v4 as uuidv4 } from "uuid";

function AddEducation({
  getData,
}: {
  getData: (category: CategoryType, data: educationType[]) => void;
}) {
  const [educationList, setEducationList] = useState<educationType[]>([
    initialEducationState,
  ]);

  const addNewEducation = () => {
    setEducationList((prev) => [
      ...prev,
      {
        id: uuidv4(),
        universityName: "",
        degree: "",
        major: "",
        degreeCompletion: "",
      },
    ]);
  };

  const updateEducationData = (
    index: number,
    updatedData: Partial<educationType>
  ) => {
    setEducationList((prev) => {
      const newList = [...prev];
      newList[index] = { ...newList[index], ...updatedData };
      return newList;
    });
  };

  useEffect(() => {
    if (educationList.length > 0) {
      getData("education", educationList);
    }
  }, [educationList]);

  return (
    <div>
      <div>
        <h4>학력</h4>
        <p>학력 입력 시, 사실을 증명할 수 있는 서류를 첨부해 주세요.</p>
      </div>
      {educationList.map((education, index) => (
        <div key={education.id}>
          <SelectBoxDefault
            category="degree"
            getData={(inputValue) =>
              updateEducationData(index, { degree: inputValue })
            }
          />
          <InputText
            inputType="universityName"
            placeholder="학교를 입력해 주세요"
            apiIcon="search"
            dispatch={(e) =>
              updateEducationData(index, { universityName: e.target.value })
            }
          />
          <InputText
            inputType="major"
            placeholder="학과를 입력해 주세요"
            dispatch={(e) =>
              updateEducationData(index, { major: e.target.value })
            }
          />
          <SelectBoxDefault
            category="degreeCompletion"
            getData={(inputValue) =>
              updateEducationData(index, { degreeCompletion: inputValue })
            }
          />
        </div>
      ))}
      <FilledButton text="+ 학력 추가하기" onClick={addNewEducation} />
      <InputFile placeholder="학력증명서 추가하기" />
    </div>
  );
}

export default AddEducation;

const initialEducationState: educationType = {
  id: uuidv4(),
  degree: "",
  universityName: "",
  major: "",
  degreeCompletion: "",
};
