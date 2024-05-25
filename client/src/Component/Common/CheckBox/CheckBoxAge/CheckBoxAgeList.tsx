import { useState } from "react";

import CheckBoxAgeBox from "./CheckBoxAgeBox";
import { StyledCheckBoxContainer } from "./CheckBoxAge.style";

function CheckBoxAgeList({
  treatmentData,
  checked = false,
}: {
  treatmentData: string[];
  checked: boolean;
}) {
  const [ageValue, setAgeValue] = useState<string[]>([]);

  return (
    <StyledCheckBoxContainer value={ageValue} onChange={setAgeValue}>
      {treatmentData.map((data) => (
        <CheckBoxAgeBox
          key={data}
          label={data}
          description={data}
          checked={checked}
        />
      ))}
    </StyledCheckBoxContainer>
  );
}

export default CheckBoxAgeList;
