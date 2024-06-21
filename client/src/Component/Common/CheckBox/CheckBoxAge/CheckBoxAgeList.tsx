import { useState } from "react";

import CheckBoxAgeBox from "./CheckBoxAgeBox";
import { StyledCheckBoxContainer } from "./CheckBoxAge.style";

import careChildAge from "../../../../Assets/TextData/careChildAge";

function CheckBoxAgeList({
  checkedData,
  setData,
  onChange,
}: CheckBoxAgeListProps) {
  const [ageValue, setAgeValue] = useState<string[]>([]);

  const handleOnChange = (value: string[]) => {
    setAgeValue(value);
    onChange && onChange(value);
  };
  return (
    <StyledCheckBoxContainer value={ageValue} onChange={handleOnChange}>
      {careChildAge.map((data) => (
        <CheckBoxAgeBox
          key={data.label}
          label={data.label}
          description={data.description}
          checkedData={checkedData}
          setData={setData}
        />
      ))}
    </StyledCheckBoxContainer>
  );
}

export default CheckBoxAgeList;

type CheckBoxAgeListProps = {
  checkedData: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  onChange?: (value: string[]) => void;
};
