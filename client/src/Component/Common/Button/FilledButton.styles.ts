import styled from "styled-components";

export const StyledButton = styled.div`
  display: inline-block;
  position: relative;
`;

export const getButtonStyles = (
  variant: string,
  disabled: string[],
  hovered: boolean,
  backgroundColor: string
) => {
  const baseStyles = {
    width: "100%",
    padding: variant === "filled" ? "0 16px" : "0 8px",
    height: variant === "filled" ? "56px" : "32px",
    fontSize: variant === "filled" ? "16px" : "14px",
    fontWeight: variant === "filled" ? "700" : "500",
    color: hovered ? "#FFFFFF" : "#FFFFFF",
    backgroundColor: hovered
      ? variant === "filled"
        ? "#FFD8B8"
        : "#FFB274"
      : backgroundColor,
    transition: "0.2s",
  };

  if (disabled.includes("disabledLight")) {
    return {
      ...baseStyles,
      backgroundColor: "#F2F2F2",
      color: "#999999",
      cursor: "not-allowed",
    };
  } else if (disabled.includes("disabledDark")) {
    return {
      ...baseStyles,
      backgroundColor: variant === "filled" ? "#BEBEBE" : "#BEBEBE",
      color: "#999999",
      cursor: "not-allowed",
    };
  } else {
    return baseStyles;
  }
};

export const StyledIcon = styled.img`
  margin-right: 4px;
`;
