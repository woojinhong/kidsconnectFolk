import styled from "styled-components";
import { Combobox, Select } from "@mantine/core";

export const CustomComboboxDropdown = styled(Combobox.Dropdown)`
  border: none;
`;

export const StyledContainer = styled.div<{
  $size: "sm" | "lg";
}>`
  position: relative;
  width: ${(props) => (props.$size === "sm" ? "fit-content" : "100%")};
  img {
    width: ${(props) => (props.$size === "sm" ? "16px" : "24px")};
    height: ${(props) => (props.$size === "sm" ? "16px" : "24px")};
  }
`;

export const StyledSelectbox = styled(Select)<{
  width?: string;
  height?: string;
  value: string | null;
  $isFocused: boolean;
  $isValue?: boolean | null;
  $size?: "sm" | "lg";
}>`
  input {
    display: flex;
    width: ${(props) =>
      props.width ? props.width : props.$size === "sm" ? "120px" : "100%"};
    border-radius: ${(props) => (props.$size === "sm" ? "8px" : "16px")};
    height: ${(props) =>
      props.$size === "sm" ? "32px" : props.height ? props.height : "56px"};
    color: ${(props) => (props.value ? "#FF7000" : "inherit")};
    font-weight: ${(props) => (props.value ? 700 : 400)};
    border: ${(props) =>
      props.value
        ? props.$isFocused
          ? "1px solid #FF7000"
          : "1px solid #FF7000"
        : "1px solid #c1c1c1"};
  }
  font-size: ${(props) => (props.$size === "sm" ? "13px" : "16px")};
`;
