import React, { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import Cancel from "../../../Assets/Image/Cancel.svg";
import Search from "../../../Assets/Image/Search.svg";

interface InputComplexProps {
  label: string;
  width: string;
  showDescription: boolean;
  showWithAsterisk: boolean;
  placeholder: string;
  icon: boolean;
  apiIcon: boolean;
  btn: boolean;
}

const InputText: React.FC<InputComplexProps> = ({
  label,
  width,
  showDescription,
  showWithAsterisk,
  placeholder,
  icon,
  apiIcon,
  btn,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newValue)) {
      setError("이메일 형식에 맞게 입력해주세요");
    } else {
      setError("");
    }
  };

  let rightSectionContent = null;
  if (btn) {
    rightSectionContent = (
      <div style={{ width: "87px", height: "36px", marginRight: "90px" }}>
        <Button
          style={{
            backgroundColor: "#FFB274",
            fontWeight: 400,
          }}
        >
          중복 확인
        </Button>
      </div>
    );
  } else if (icon) {
    rightSectionContent = (
      <img
        src={Cancel}
        alt="Cancel"
        style={{
          cursor: "pointer",
          width: "24px",
          height: "24px",
        }}
      />
    );
  } else if (apiIcon) {
    rightSectionContent = (
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
          src={Search}
          alt="Search"
          style={{
            cursor: "pointer",
            width: "16px",
            height: "16px",
          }}
        />
      </div>
    );
  }

  return (
    <TextInput
      size="lg"
      radius="lg"
      label={label}
      withAsterisk={showWithAsterisk ? showWithAsterisk : undefined}
      description={showDescription ? "상세설명" : undefined}
      error={error}
      value={value}
      placeholder={placeholder}
      style={{ width }}
      styles={{
        input: { border: "1px solid #C1C1C1", height: "56px", fontSize: 14 },
        label: { fontWeight: 700, marginBottom: 10 },
      }}
      onChange={handleChange}
      rightSection={rightSectionContent}
    />
  );
};

export default InputText;
