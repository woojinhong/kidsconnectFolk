import styled from "styled-components";

export const StyledButtonWrapper = styled.div`
  display: block;
`;

export const getCommonButtonStyles = (
  borderColor: string,
  isDisabled: boolean | undefined,
  hovered: boolean
) => {
  return {
    width: "100%",
    border: `1px solid ${isDisabled ? "#999999" : borderColor}`,
    backgroundColor: isDisabled ? "#b2b2b2" : hovered ? "#FFD8B8" : "#ffffff",
    transition: "0.2s",
    color: hovered ? "#FF7000" : "#FF7000",
  };
};
export const getButtonStyles = (variant: string) => {
  switch (variant) {
    case "outline":
      return {
        height: "56px",
        fontSize: "16px",
        fontWeight: "700",
      };
    case "m_outline":
      return {
        height: "32px",
        fontSize: "14px",
        fontWeight: "500",
      };
    default:
      return {};
  }
};
