import { useState } from "react";
import { DatePickerInput, DateValue } from "@mantine/dates";

import IconCalendar from "../../../Assets/Image/Icon/IconCalendar.svg";
import IconNext from "../../../Assets/Image/Icon/arrowRight.svg";
import IconBefore from "../../../Assets/Image/Icon/arrowLeft.svg";

function InputDatePicker({
  placeholder,
  size = "lg",
  icon,
  label,
  showWithAsterisk,
  dispatch,
  disabled,
}: {
  placeholder: string;
  size?: "xs" | "lg";
  label?: string;
  icon?: boolean;
  showWithAsterisk?: boolean;
  dispatch?: (inputValue: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = useState<Date | null>(null);
  const changeLabelToEnglish = (label: string | undefined) => {
    if (label === "생년월일") return "birth";
    return label;
  };
  const calendarIcon = (
    <div
      style={{
        paddingRight: "16px",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: "#FFB274",
          borderRadius: "50%",
        }}
      >
        <img
          src={IconCalendar}
          alt="클릭하여 날짜 선택"
          style={{
            cursor: "pointer",
            width: "16px",
            height: "16px",
          }}
        />
      </div>
    </div>
  );
  const handleOnChange = (value: DateValue) => {
    setValue(value);
    if (dispatch && value) dispatch(value.toISOString());
  };
  return (
    <DatePickerInput
      id={changeLabelToEnglish(label)}
      label={label}
      rightSection={icon ? calendarIcon : null}
      rightSectionPointerEvents="none"
      name={changeLabelToEnglish(label)}
      radius={size === "lg" ? "16px" : "8px"}
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      nextIcon={<img src={IconNext} />}
      previousIcon={<img src={IconBefore} />}
      styles={{
        input: {
          height: size === "lg" ? "56px" : "40px",
          fontSize: size === "lg" ? "16px" : "14px",
          border: "1px solid #c1c1c1",
        },
        label: {
          fontSize: "16px",
          fontWeight: 700,
        },
        placeholder: {
          color: "#e1e1e1",
          fontWeight: 400,
        },
      }}
      required={showWithAsterisk}
      disabled={disabled}
    />
  );
}

export default InputDatePicker;
