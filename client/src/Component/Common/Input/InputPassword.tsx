import { useState, useEffect } from "react";

import { PasswordInput } from "@mantine/core";
import { InputPasswordText } from "../../../Assets/TextData/SignCommonText";
import { SignCommonTextType } from "../../../Assets/TextData/SignCommonText";

import styled from "styled-components";

function InputPassword() {
  const { labelText, placeholderText, errorMessage, regEx } =
    InputPasswordText as SignCommonTextType;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handlePasswordValidation = (password: string) => {
    if (regEx.test(password) || password === "") {
      return setError("");
    } else {
      return setError(errorMessage);
    }
  };

  useEffect(() => {
    handlePasswordValidation(value);
  }, [value, error]);

  return (
    <StyledTextInput
      size="lg"
      radius="16px"
      withAsterisk={true}
      placeholder={placeholderText}
      label={labelText}
      value={value}
      onChange={handleChange}
      styles={{
        input: { border: "1px solid #C1C1C1", height: "56px", fontSize: 16 },
        label: { fontWeight: 700 },
      }}
      error={error ? error : null}
    ></StyledTextInput>
  );
}

export default InputPassword;

export const StyledTextInput = styled(PasswordInput)`
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
  & p {
    font-size: 12px;
  }
`;
