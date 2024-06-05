import styled from "styled-components";

interface StyledCommonProps {
  size?: "sm" | "md" | "lg" | "xl";
  isChecked?: boolean;
  main?: boolean;
  hovered?: boolean;
  checkbox?: boolean;
}

function switchBoxSize(size: string | undefined) {
  switch (size) {
    case "sm":
      return "80px";
    case "md":
      return "96px";
    case "lg":
      return "100px";
    case "xl":
      return "120px";
    default:
      return "80px";
  }
}

export const StyledActionIcon = styled.div<StyledCommonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${(props) => (props.size === "sm" ? "4px" : "6px")};
  width: ${(props) => switchBoxSize(props.size)};
  height: ${(props) => switchBoxSize(props.size)};
  background-color: ${(props) =>
    props.main
      ? "#ffffff "
      : props.checkbox && props.hovered
        ? "#ffffff"
        : " #f2f2f2"};
  border-radius: 16px;
  border: ${(props) =>
    props.checkbox && props.isChecked
      ? "2px solid #FF7000"
      : props.checkbox && props.hovered
        ? "2px solid #FFD8B8"
        : "none"};
  cursor: ${(props) => (props.checkbox ? "pointer" : "default")};
  color: ${(props) => (props.isChecked ? "#333333" : "#999999")};
  transition: all 0.2s;

  & strong {
    opacity: ${(props) => (props.isChecked ? 1 : 0.8)};
  }
`;

export const Emoji = styled.strong<StyledCommonProps>`
  margin-bottom: ${(props) => (props.size === "sm" ? "4px" : "10px")};
  font-size: ${(props) =>
    props.size === "sm" ? "24px" : props.size === "xl" ? "32px" : "28px"};
  line-height: 1;
`;

export const Text = styled.span<StyledCommonProps>`
  font-size: ${(props) => (props.size === "sm" ? "14px" : "16px")};
  font-weight: 500;
`;
