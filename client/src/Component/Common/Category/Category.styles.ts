import styled from "styled-components";

interface StyledCommonProps {
  size?: "xxs" | "sm" | "md" | "lg" | "xl";
  $ischecked?: boolean;
  $main?: boolean;
  $hovered?: boolean;
  $checkbox?: boolean;
  disabled?: boolean;
}

function switchBoxSize(size: string | undefined) {
  switch (size) {
    case "xxs":
      return "32px";
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

function switchFontSize(size: string | undefined) {
  switch (size) {
    case "xxs":
      return "14px";
    case "sm":
      return "24px";
    case "xl":
      return "32px";
    default:
      return "28px";
  }
}

export const StyledActionIcon = styled.div<StyledCommonProps>`
  display: flex;
  flex-direction: ${(props) => (props.size === "xxs" ? "row" : "column")};
  align-items: center;
  justify-content: center;
  padding-top: ${(props) => (props.size === "sm" ? "4px" : "6px")};
  width: ${(props) =>
    props.size === "xxs" ? "100%" : switchBoxSize(props.size)};
  height: ${(props) => switchBoxSize(props.size)};
  background-color: ${(props) => determineBackgroundColor(props)};
  border-radius: ${(props) => (props.size === "xxs" ? "8px" : "16px")};
  border: ${(props) => determineBorderStyle(props)};
  cursor: ${(props) => (props.$checkbox ? "pointer" : "default")};
  transition: all 0.2s;
  gap: ${(props) => (props.size === "xxs" ? "8px" : "0px")};
  & strong {
    opacity: ${(props) => (props.$ischecked ? 1 : 0.8)};
  }
`;

export const Emoji = styled.strong<StyledCommonProps>`
  margin-bottom: ${(props) => switchMarginBottom(props.size)};
  font-size: ${(props) => switchFontSize(props.size)};
  line-height: 1;
`;

export const Text = styled.span<StyledCommonProps>`
  font-size: ${(props) => (props.size === "sm" || "xxs" ? "14px" : "16px")};
  font-weight: 500;
`;

const switchMarginBottom = (size: string | undefined) => {
  switch (size) {
    case "xxs":
      return "0px";
    case "sm":
      return "4px";
    default:
      return "10px";
  }
};

const determineBackgroundColor = (props: StyledCommonProps) => {
  if (props.disabled) {
    return "#BEBEBE";
  } else if (props.$main) {
    return "#ffffff";
  } else if ((props.$checkbox && props.$hovered) || props.$ischecked) {
    return "#ffffff";
  } else {
    return "#f2f2f2";
  }
};

const determineBorderStyle = (props: StyledCommonProps): string => {
  if (props.disabled) {
    return "none";
  } else if (props.$checkbox && props.$ischecked) {
    return "2px solid #FF7000";
  } else if (props.$checkbox && props.$hovered) {
    return "2px solid #FFD8B8";
  } else {
    return "none";
  }
};
