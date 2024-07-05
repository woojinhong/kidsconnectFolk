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

import {
  StyledCommonContainer,
  StyledEducationInputContainer,
  StyledCareerButtonContainer,
} from "../../../Pages/CreateIntroduction/CreateIntroduction.style";

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
        education: "",
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
    <StyledCommonContainer>
      <div>
        <h4>학력</h4>
        <p>학력 입력 시, 사실을 증명할 수 있는 서류를 첨부해 주세요.</p>
      </div>
      {educationList.map((education, index) => (
        <StyledEducationInputContainer key={education.id}>
          <SelectBoxDefault
            width="100%"
            category="degree"
            getData={(inputValue) =>
              updateEducationData(index, { degree: inputValue })
            }
          />
          <InputText
            inputType="education"
            placeholder="학교를 입력해 주세요"
            apiIcon="search"
            dispatch={(e) =>
              updateEducationData(index, { education: e.target.value })
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
            width="100%"
            category="degreeCompletion"
            getData={(inputValue) =>
              updateEducationData(index, { degreeCompletion: inputValue })
            }
          />
        </StyledEducationInputContainer>
      ))}
      <StyledCareerButtonContainer>
        <FilledButton
          variant="m_filled"
          height="40px"
          text="+ 학력 추가하기"
          onClick={addNewEducation}
        />
        <InputFile size="sm" height="40px" placeholder="학력증명서 추가하기" />
      </StyledCareerButtonContainer>
    </StyledCommonContainer>
  );
}

export default AddEducation;

const initialEducationState: educationType = {
  id: uuidv4(),
  degree: "",
  education: "",
  major: "",
  degreeCompletion: "",
};
