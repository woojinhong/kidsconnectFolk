import styled from "styled-components";
import { Checkbox as MantineCheckbox } from "@mantine/core";

export const StyledCheckBoxContainer = styled(MantineCheckbox.Group)`
  & > div {
    display: flex;
    gap: 16px;
  }
`;

export const StyledCheckBox = styled(MantineCheckbox)`
  display: flex;
  flex-direction: row;
  & > div {
    text-align: center;
    padding: 0;
    margin: 0;
    position: relative;
  }
  & input {
    display: none;
  }
  & > div > div.mantine-Checkbox-inner {
    display: none;
  }

  & label {
    display: flex;
    position: relative;
    width: 96px;
    height: 96px;
    padding: 0 0 20px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background-color: #f2f2f2;
    color: #999;
    font-size: 16px;
    font-weight: 700;
    transition: 0.3s;
    cursor: pointer;
  }
  & p {
    position: absolute;
    width: 100%;
    padding: 0;
    font-size: 13px;
    color: #999;
    transition: 0.3s;
  }
  &.enfant p,
  &.jeune_enfant p {
    top: 48px;
  }
  &.elementaire_jeune p,
  &.elementaire_vieux p {
    top: 56px;
  }
  & label:hover {
    color: #666;
  }
  &.checked label,
  &.checked p {
    color: #fff;
  }
  &.enfant.checked label {
    background-color: #6889ff;
  }
  &.jeune_enfant.checked label {
    background-color: #ffb274;
  }
  &.elementaire_jeune.checked label {
    background-color: #94c290;
  }
  &.elementaire_vieux.checked label {
    background-color: #dec95f;
  }
`;
