import { useState } from "react";

import CheckBoxAgeBox from "./CheckBoxAgeBox";
import { StyledCheckBoxContainer } from "./CheckBoxAge.style";

import careChildAge from "../../../../Assets/TextData/careChildAge";

function CheckBoxAgeList({ checked = false }: { checked?: boolean }) {
  const [ageValue, setAgeValue] = useState<string[]>([]);

  return (
    <StyledCheckBoxContainer value={ageValue} onChange={setAgeValue}>
      {careChildAge.map((data) => (
        <CheckBoxAgeBox
          key={data.label}
          label={data.label}
          description={data.description}
          checked={checked}
        />
      ))}
    </StyledCheckBoxContainer>
  );
}

export default CheckBoxAgeList;
