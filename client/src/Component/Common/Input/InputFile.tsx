import { useState } from "react";
import { FileInput, FileInputProps } from "@mantine/core";
import styled from "styled-components";
import UploadIcon from "../../../Assets/Image/Icon/IconUploadPC.svg";
import UploadIconWt from "../../../Assets/Image/Icon/IconUpload.svg";
import { CategoryType } from "../../../Pages/CreateIntroduction/CreateIntroductionType";

function InputFile({
  placeholder,
  multiple = true,
  size = "lg",
  icon = false,
  onChange,
  inputType,
  showValue = false,
  height,
  style = "primary",
}: InputFilePropsType) {
  const [uploadedFile, setUploadedFile] = useState<File | File[] | null>(null);
  const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
    if (value === null) {
      return null;
    }
    return <span>{placeholder}</span>;
  };

  const handleMappingFile = (file: File | File[]) => {
    if (Array.isArray(file) && showValue) {
      return file.map((file) => <li key={file.name}>{file.name}</li>);
    } else if (!Array.isArray(file) && showValue) {
      return <li>{file.name}</li>;
    } else {
      return null;
    }
  };

  const handleFileChanges = (payload: File | File[] | null) => {
    setUploadedFile(payload);
    if (payload && inputType) {
      onChange && onChange(payload, inputType);
    } else if (payload) {
      onChange && onChange(payload);
    }
  };

  return (
    <div>
      <StyledFileInput
        styles={{
          input: {
            border: `1px solid ${changeBorderColor(style)}`,
            height: height,
          },
        }}
        onChange={onChange ? handleFileChanges : undefined}
        accept="image/png, image/jpeg"
        placeholder={placeholder}
        multiple={multiple}
        leftSection={!icon ? <img src={UploadIcon} /> : null}
        size={size}
        valueComponent={ValueComponent}
        rightSection={
          icon ? (
            <div style={{ marginRight: "16px" }}>
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
                  src={UploadIconWt}
                  style={{
                    cursor: "pointer",
                    width: "16px",
                    height: "16px",
                  }}
                />
              </div>
            </div>
          ) : null
        }
      />
      {uploadedFile ? <ul> {handleMappingFile(uploadedFile)}</ul> : null}
    </div>
  );
}
export default InputFile;

type InputFilePropsType = {
  inputType?: CategoryType;
  placeholder: string;
  multiple?: boolean;
  size?: "sm" | "lg";
  icon?: boolean;
  onChange?: (file: File | File[], category?: CategoryType) => void;
  showValue?: boolean;
  height?: string;
  style?: "normal" | "primary";
};

const StyledFileInput = styled(FileInput)`
  & span {
    color: #ff7000;
  }
  & img {
    width: 16px;
    height: 16px;
  }
  & button {
    border: 1px solid #ff7000;
  }
`;

const changeBorderColor = (style: "normal" | "primary") => {
  if (style === "normal") {
    return "#c1c1c1";
  } else {
    return "#ff7000";
  }
};
