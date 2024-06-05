import { useState } from "react";
import { Textarea } from "@mantine/core";
import styled from "styled-components";

interface InputComplexProps {
  label: string;
  placeholder: string;
  detailedDescription?: string;
  showWithAsterisk?: boolean;
  showCharCount?: boolean;
  maxCharCount?: number;
  height?: string;
}

const InputTextArea: React.FC<InputComplexProps> = ({
  label,
  height = "240px",
  detailedDescription,
  showWithAsterisk = false,
  placeholder,
  showCharCount = true,
  maxCharCount = 40,
}) => {
  const [value, setValue] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 100) {
      setValue(inputValue);
      setCharCount(inputValue.length);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <StyledTextInput
        size="lg"
        radius="lg"
        label={label}
        withAsterisk={showWithAsterisk ? showWithAsterisk : undefined}
        description={detailedDescription ? detailedDescription : undefined}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxCharCount}
        style={{ width: "100%" }}
        styles={{
          input: {
            border: "1px solid #C1C1C1",
            height,
            fontSize: 16,
            padding: "16px",
          },
          label: { fontWeight: 700 },
        }}
      />
      {showCharCount && (
        <div style={{ fontSize: "13px" }}>
          <span style={{ fontWeight: 700, color: "#FF7000" }}>{charCount}</span>
          <span>/{maxCharCount}</span>
        </div>
      )}
    </div>
  );
};

export default InputTextArea;

export const StyledTextInput = styled(Textarea)`
  & label {
    font-size: 16px;
  }
  & p span {
    font-size: 14px;
    color: #999999;
  }
  & input:placeholder {
    color: #c1c1c1;
  }
  & > p {
    font-size: 13px;
    color: #999999;
  }
`;
