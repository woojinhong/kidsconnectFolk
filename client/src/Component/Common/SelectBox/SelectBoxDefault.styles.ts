import styled from "styled-components";
import { Combobox, InputBase, ScrollArea } from "@mantine/core";

export const CustomComboboxDropdown = styled(Combobox.Dropdown)`
  border: none;
`;

export const StyledContainer = styled.div<{
  isFocused: boolean;
  width: string;
}>`
  position: relative;
  width: ${(props) => props.width};
  border-radius: 16px;
  border: 1px solid ${(props) => (props.isFocused ? "#FF7000" : "#999999")};
`;

export const StyledArrow = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  pointer-events: none;
`;

export const StyledInputBase = styled(InputBase)<{
  height: string;
  isValue: boolean;
}>`
  input {
    border-radius: 16px;
    height: ${(props) => props.height};
    color: ${(props) => (props.isValue ? "#FF7000" : "inherit")};
    font-weight: ${(props) => (props.isValue ? 700 : 400)};
  }
`;

export const SelectBoxOptions = styled(ScrollArea.Autosize)`
  width: 242px;
  height: fit-content;
  padding: 16px 0px 16px 0px;
  border-radius: 16px;
  border: 1px solid #c1c1c1;
`;

export const OptionItem = styled.div<{
  isSelected: boolean;
}>`
  width: 240px;
  cursor: pointer;
  font-weight: ${(props) => (props.isSelected ? 700 : 400)};
  color: ${(props) => (props.isSelected ? "#FF7000" : "inherit")};
  &:hover {
    background-color: #f2f2f2;
  }
`;