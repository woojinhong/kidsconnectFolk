import { Textarea } from "@mantine/core";
import { useState } from "react";

interface InputComplexProps {
  label: string;
  width: string;
  showDescription: boolean;
  showWithAsterisk: boolean;
  placeholder: string;
  showCharCount: boolean;
}

const InputTextArea: React.FC<InputComplexProps> = ({
  label,
  width,
  showDescription,
  showWithAsterisk,
  placeholder,
  showCharCount,
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
      <Textarea
        size="lg"
        radius="lg"
        label={label}
        withAsterisk={showWithAsterisk ? showWithAsterisk : undefined}
        description={showDescription ? "상세설명" : undefined}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={100}
        style={{ width }}
        styles={{
          input: { border: "1px solid #C1C1C1", height: "140px", fontSize: 14 },
          label: { fontWeight: 700, marginBottom: 10 },
        }}
      />
      {showCharCount && (
        <div style={{ marginLeft: 10 }}>
          <span style={{ fontWeight: 700, color: "#FF7000" }}>{charCount}</span>
          <span>/100</span>
        </div>
      )}
    </div>
  );
};

export default InputTextArea;
