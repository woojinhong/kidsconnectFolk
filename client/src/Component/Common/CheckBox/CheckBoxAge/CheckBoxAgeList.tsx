import { useState } from "react";

import CheckBoxAgeBox from "./CheckBoxAgeBox";
import { StyledCheckBoxContainer } from "./CheckBoxAge.style";

//TODO: 후에 careChildAge를 치료사 정보에 저장된 데이터로 돌릴 수 있게 수정하기
import careChildAge from "../../../../Assets/TextData/careChildAge";

function CheckBoxAgeList() {
  const [ageValue, setAgeValue] = useState<string[]>([]);

  return (
    <StyledCheckBoxContainer value={ageValue} onChange={setAgeValue}>
      {careChildAge.map((data) => (
        <CheckBoxAgeBox
          key={data.label}
          label={data.label}
          description={data.description}
        />
      ))}
    </StyledCheckBoxContainer>
  );
}

export default CheckBoxAgeList;
