import styled from "styled-components";

export const StyledButton = styled.div`
  display: block;
  position: relative;
`;

export const getButtonStyles = (
  variant: string,
  disabled: boolean,
  hovered: boolean,
  backgroundColor: string,
  height?: string
) => {
  return {
    width: "100%",
    padding: variant === "filled" ? "0 16px" : "0 8px",
    height: height ? height : variant === "filled" ? "56px" : "32px",
    fontSize: variant === "filled" ? "16px" : "14px",
    fontWeight: variant === "filled" ? "700" : "500",
    fontColor: disabled ? "#333333" : "#ffffff",
    backgroundColor: disabled
      ? "#BEBEBE"
      : hovered
        ? "#FFB274"
        : backgroundColor,
    transition: "0.2s",
  };
};

export const StyledIcon = styled.img`
  margin-right: 4px;
`;
