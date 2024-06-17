import React, { useState, useEffect } from "react";
import { Button, TextInput } from "@mantine/core";
import styled from "styled-components";

import { changeInputEvent } from "../../../Assets/CommonType/EventType";
import { InputEmailText } from "../../../Assets/TextData/SignCommonText";
import { SignCommonTextType } from "../../../Assets/TextData/SignCommonText";
import { useErrorMessagesAccordingToInputLabel } from "../../../Services/CustomHooks";

import Cancel from "../../../Assets/Image/Cancel.svg";
import IconSearch from "../../../Assets/Image/Search.svg";
import IconCalendar from "../../../Assets/Image/Icon/IconCalendar.svg";
import IconUpload from "../../../Assets/Image/Icon/IconUpload.svg";

const InputText: React.FC<InputComplexProps> = ({
  label = "",
  width = "100%",
  detailedDescription = "",
  showWithAsterisk = false,
  placeholder = "",
  icon = false,
  apiIcon,
  button = false,
  disabled = false,
  inputType = "",
  dispatch,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const findName = inputType ? inputType : labelToName(label);
  const { labelText, withAsterisk, placeholderText, errorMessage, regEx } =
    InputEmailText as SignCommonTextType;

  useEffect(() => {
    if (inputType === "email") {
      handleEmailValidation(value);
    }
    if (inputType === "phoneNum") {
      handlePhoneNumValidation(value);
    }
  }, [value, error]);

  useEffect(() => {
    if (disabled) {
      setValue("");
      dispatch &&
        dispatch({
          target: { name: findName, value: "" },
        } as changeInputEvent);
    }
  }, [disabled]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputType === "phoneNum") {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
    const newValue = event.target.value;
    setValue(newValue);
    if (dispatch) dispatch(event);
  };

  const handleEmailValidation = (email: string) => {
    if (regEx.test(email) || email === "") {
      return setError("");
    } else {
      return setError(errorMessage);
    }
  };

  const handlePhoneNumValidation = (phoneNum: string) => {
    if (phoneNum.length === 11 || value === "") {
      return setError("");
    } else {
      return setError(useErrorMessagesAccordingToInputLabel(label));
    }
  };

  let rightSectionContent = null;

  if (button) {
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
          src={apiIconSwitch(apiIcon)}
          alt={apiIconAltSwitch(apiIcon)}
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
    <StyledTextInput
      name={findName}
      size="lg"
      radius="16px"
      label={inputType === "email" ? labelText : label}
      withAsterisk={
        showWithAsterisk
          ? showWithAsterisk
          : inputType === "email"
            ? withAsterisk
            : undefined
      }
      description={
        detailedDescription ? <span>{detailedDescription}</span> : undefined
      }
      value={value}
      placeholder={inputType === "email" ? placeholderText : placeholder}
      style={{ width }}
      styles={{
        input: { border: "1px solid #C1C1C1", height: "56px", fontSize: 16 },
        label: { fontWeight: 700 },
      }}
      onChange={handleChange}
      rightSection={rightSectionContent}
      disabled={disabled}
      error={error ? error : null}
    />
  );
};

export default InputText;

const labelToName = (label: string) => {
  switch (label) {
    case "성":
      return "lastName";
    case "이름":
      return "firstName";
    case "휴대폰 번호":
      return "phoneNum";
    default:
      return "";
  }
};

const apiIconSwitch = (apiIcon: string) => {
  switch (apiIcon) {
    case "search":
      return IconSearch;
    case "calendar":
      return IconCalendar;
    case "upload":
      return IconUpload;
    default:
      return "";
  }
};

const apiIconAltSwitch = (apiIcon: string) => {
  switch (apiIcon) {
    case "search":
      return "검색하기";
    case "calendar":
      return "날짜 선택하기";
    case "upload":
      return "이미지 업로드하기";
    default:
      return "";
  }
};

export const StyledTextInput = styled(TextInput)`
  & label {
    font-size: 16px;
  }
  & p span {
    font-size: 13px;
    color: #999999;
  }
  & p {
    font-size: 12px;
  }
`;

export interface InputComplexProps {
  label?: string;
  placeholder?: string;
  inputType?: "email" | "detailAddress" | "phoneNum";
  width?: string;
  detailedDescription?: string;
  showWithAsterisk?: boolean;
  icon?: boolean;
  apiIcon?: "search" | "calendar" | "upload" | undefined;
  button?: boolean;
  disabled?: boolean;
  dispatch?: (e: changeInputEvent) => void;
}
