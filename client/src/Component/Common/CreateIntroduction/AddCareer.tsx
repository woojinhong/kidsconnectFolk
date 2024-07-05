import { useState, useEffect } from "react";
import DaumPostCode from "../../Membership/SignUp/DaumPostModal/DaumPostCode";
import InputNumber from "../Input/InputNumber";
import InputFile from "../Input/InputFile";
import {
  careerType,
  CategoryType,
} from "../../../Pages/CreateIntroduction/CreateIntroductionType";
import FilledButton from "../Button/FilledButton";

import {
  StyledCommonContainer,
  StyledCareerInputContainer,
  StyledCareerButtonContainer,
} from "../../../Pages/CreateIntroduction/CreateIntroduction.style";

function AddCareer({
  getData,
}: {
  getData: (category: CategoryType, data: careerType[]) => void;
}) {
  const [careerList, setCareerList] = useState<careerType[]>([
    initialCareerState,
  ]);

  const addNewCareer = () => {
    setCareerList((prev) => [
      ...prev,
      { centerName: "", startDate: 0, endDate: 0 },
    ]);
  };

  const updateCareerData = (
    index: number,
    updatedData: Partial<careerType>
  ) => {
    setCareerList((prev) => {
      const newList = [...prev];
      newList[index] = { ...newList[index], ...updatedData };
      return newList;
    });
  };

  useEffect(() => {
    if (careerList.length > 0) {
      getData("career", careerList);
    }
  }, [careerList]);

  return (
    <StyledCommonContainer>
      <div>
        <h4>경력</h4>
        <p>경력증명서를 첨부하셔야 인증 마크가 달려요.</p>
      </div>
      {careerList.map((career, index) => (
        <StyledCareerInputContainer key={career.centerName}>
          <DaumPostCode
            placeholder="센터/병원/기관 검색"
            dispatch={(_, inputValue) =>
              updateCareerData(index, { centerName: inputValue })
            }
          />
          <InputNumber
            label="year"
            placeholder="n"
            dispatch={(_, inputValue) =>
              updateCareerData(index, { startDate: Number(inputValue) })
            }
          />
          <span>년</span>
          <InputNumber
            label="month"
            placeholder="n"
            dispatch={(_, inputValue) =>
              updateCareerData(index, { endDate: Number(inputValue) })
            }
          />
          <span>개월</span>
        </StyledCareerInputContainer>
      ))}
      <StyledCareerButtonContainer>
        <FilledButton
          variant="m_filled"
          height="40px"
          text="+ 경력 추가하기"
          onClick={addNewCareer}
        />
        <InputFile size="sm" height="40px" placeholder="경력증명서 첨부하기" />
      </StyledCareerButtonContainer>
    </StyledCommonContainer>
  );
}

export default AddCareer;

const initialCareerState: careerType = {
  centerName: "",
  startDate: 0,
  endDate: 0,
};
