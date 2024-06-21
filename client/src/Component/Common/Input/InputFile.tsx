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
}: InputFilePropsType) {
  const [uploadedFile, setUploadedFile] = useState<File | File[] | null>(null);
  const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
    if (value === null) {
      return null;
    }
    return <span>{placeholder}</span>;
  };

  const handleMappingFile = (file: File | File[]) => {
    if (Array.isArray(file)) {
      return file.map((file) => <li key={file.name}>{file.name}</li>);
    } else {
      return <li>{file.name}</li>;
    }
  };

  const handleFileChanges = (payload: File | File[] | null) => {
    setUploadedFile(payload);
    if (payload) {
      onChange && inputType && onChange(inputType, payload);
    }
  };
  return (
    <div>
      <StyledFileInput
        onChange={onChange ? handleFileChanges : undefined}
        accept="image/png, image/jpeg"
        placeholder={placeholder}
        multiple={multiple}
        leftSection={!icon ? <img src={UploadIcon} /> : null}
        size={size}
        valueComponent={ValueComponent}
        rightSection={
          icon ? (
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
  onChange?: (category: CategoryType, file: File | File[]) => void;
};

const StyledFileInput = styled(FileInput)`
  padding: 24px;
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
