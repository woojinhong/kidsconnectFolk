import { useState } from "react";
import { NumberInput } from "@mantine/core";

function InputNumber({
  label = "",
  placeholder = "",
  showWithAsterisk = false,
  disabled = false,
  dispatch,
}: InputNumberProps) {
  const [value, setValue] = useState("");

  const handleOnChange = (value: string | number) => {
    setValue(value.toString());
    dispatch && dispatch(label, value.toString());
  };

  return (
    <NumberInput
      label={label !== "year" && label !== "month" ? label : ""}
      value={value}
      placeholder={placeholder}
      required={showWithAsterisk}
      disabled={disabled}
      onChange={handleOnChange}
      hideControls={true}
      styles={{
        input: {
          height: "56px",
          borderRadius: "16px",
          border: "1px solid #c1c1c1",
          fontSize: "16px",
        },
      }}
    />
  );
}

export default InputNumber;
interface InputNumberProps {
  label?: string;
  placeholder?: string;
  showWithAsterisk?: boolean;
  disabled?: boolean;
  dispatch?: (category: string, inputValue: string) => void;
}
