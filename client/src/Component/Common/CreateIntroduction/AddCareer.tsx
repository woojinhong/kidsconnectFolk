import { useState, useEffect } from "react";
import DaumPostCode from "../../Membership/SignUp/DaumPostModal/DaumPostCode";
import InputNumber from "../Input/InputNumber";
import InputFile from "../Input/InputFile";
import { Checkbox } from "@mantine/core";
import {
  careerType,
  CategoryType,
} from "../../../Pages/CreateIntroduction/CreateIntroductionType";
import FilledButton from "../Button/FilledButton";

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
      { centerName: "", startDate: 0, endDate: 0, isWorking: false },
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
    <div>
      <div>
        <h4>경력</h4>
        <p>경력증명서를 첨부하셔야 인증 마크가 달려요.</p>
      </div>
      {careerList.map((career, index) => (
        <div key={career.centerName}>
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
          <Checkbox
            label="근무 중"
            radius="100%"
            onChange={(e) =>
              updateCareerData(index, { isWorking: e.currentTarget.checked })
            }
          />
        </div>
      ))}
      <div>
        <FilledButton text="+ 경력 추가하기" onClick={addNewCareer} />
        <InputFile placeholder="경력증명서 첨부하기" />
      </div>
      <div>
        총 <span>n</span>년 <span>n</span>개월
      </div>
    </div>
  );
}

export default AddCareer;

const initialCareerState: careerType = {
  centerName: "",
  startDate: 0,
  endDate: 0,
  isWorking: false,
};
