import { useState } from "react";

import { StyledCheckBox } from "./CheckBoxAge.style";
import {
  CheckBoxAgeBoxProps,
  titleLineBreak,
  classNameAccordingToTitle,
} from "./CheckBoxAgeProps";

function CheckBoxAgeBox({ ...props }: CheckBoxAgeBoxProps) {
  const { label, description } = props;

  const [checked, setChecked] = useState<boolean>(false);

  return (
    <StyledCheckBox
      className={`${classNameAccordingToTitle(label)} ${checked ? "checked" : ""}`}
      label={titleLineBreak(label)}
      value={label}
      description={description}
      checked={checked}
      onChange={(e) => setChecked(e.currentTarget.checked)}
      styles={{
        input: {
          display: "none",
        },
      }}
    />
  );
}

export default CheckBoxAgeBox;
