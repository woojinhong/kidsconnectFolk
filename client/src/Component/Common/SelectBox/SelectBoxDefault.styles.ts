import styled from "styled-components";
import { Combobox, Select, ScrollArea } from "@mantine/core";

export const CustomComboboxDropdown = styled(Combobox.Dropdown)`
  border: none;
`;

export const StyledContainer = styled.div<{
  width: string;
}>`
  position: relative;
  width: ${(props) => props.width};
  border-radius: 16px;
`;

export const StyledSelectbox = styled(Select)<{
  height: string;
  value: string | null;
}>`
  input {
    border-radius: 16px;
    height: ${(props) => props.height};
    color: ${(props) => (props.value ? "#FF7000" : "inherit")};
    font-weight: ${(props) => (props.value ? 700 : 400)};
  }
`;
