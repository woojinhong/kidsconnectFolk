import { useState } from "react";

import styled from "styled-components";
import { Checkbox } from "@mantine/core";
import {
  setStateStringType,
  clickInputEvent,
} from "../../Assets/CommonType/EventType";

function UserTypeCheckbox({ onClick }: { onClick: setStateStringType }) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("부모님");

  const changeValueToEnglish = (value: string) => {
    if (value === "부모님") {
      return "parents";
    } else if (value === "선생님") {
      return "therapist";
    } else {
      return "";
    }
  };

  const handleCheck = (event: clickInputEvent) => {
    const newValue = event.currentTarget.value;
    setIsChecked(!isChecked);
    setUserType(newValue);
    onClick(changeValueToEnglish(newValue));
  };

  return (
    <StyledCheckboxGroup>
      <StyledCheckbox
        value="부모님"
        label="부모님"
        styles={{
          input: {
            display: "none",
          },
        }}
        checked={userType === "부모님" ? true : false}
        onClick={handleCheck}
      />
      <StyledCheckbox
        value="선생님"
        label="선생님"
        styles={{
          input: {
            display: "none",
          },
        }}
        checked={userType === "선생님" ? true : false}
        onClick={handleCheck}
      />
    </StyledCheckboxGroup>
  );
}

export default UserTypeCheckbox;

const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    flex-direction: row;
  }
`;
const StyledCheckbox = styled(Checkbox)`
  display: flex;
  width: 100%;
  font-size: 16px;
  background-color: ${(props) => (props.checked ? "#ff7000" : "#fff")};
  border: 1px solid #ff7000;
  border-radius: 16px;

  & div {
    width: 100%;
    text-align: center;
  }

  & label {
    display: block;
    width: 100%;
    height: 56px;
    padding: 0;
    line-height: 56px;
    font-size: 16px;
    color: ${(props) => (props.checked ? "#fff" : "#ff7000")};
    font-weight: ${(props) => (props.checked ? "700" : "500")};
    cursor: pointer;
  }
  & > div > div.mantine-Checkbox-inner {
    display: none;
  }
`;
