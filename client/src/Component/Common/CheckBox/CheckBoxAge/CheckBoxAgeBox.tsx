import { useState, useEffect } from "react";

import { StyledCheckBox } from "./CheckBoxAge.style";
import {
  CheckBoxAgeBoxProps,
  titleLineBreak,
  classNameAccordingToTitle,
} from "./CheckBoxAgeProps";

function CheckBoxAgeBox({ ...props }: CheckBoxAgeBoxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { label, description, checkedData, setData } = props;

  const handleCheckbox = () => {
    if (checkedData.includes(label)) {
      setData && setData(checkedData.filter((data) => data !== label));
    } else {
      setData && setData([...checkedData, label]);
    }
  };

  useEffect(() => {
    if (checkedData.includes(label)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedData]);

  return (
    <StyledCheckBox
      className={`${classNameAccordingToTitle(label)} ${isChecked ? "checked" : ""}`}
      label={titleLineBreak(label)}
      value={label}
      description={description}
      checked={isChecked}
      onChange={handleCheckbox}
      styles={{
        input: {
          display: "none",
        },
      }}
    />
  );
}

export default CheckBoxAgeBox;
