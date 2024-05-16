import styled from "styled-components";

export const StyledButtonWrapper = styled.div`
  display: inline-block;
`;

export const getButtonStyles = (variant: string, hovered: boolean) => {
  switch (variant) {
    case "outline":
      return {
        maxWidth: "fit-content",
        height: "56px",
        fontSize: "16px",
        fontWeight: "700",
        border: "1px solid #FF7000",
        color: hovered ? "#FF7000" : "#FF7000",
        backgroundColor: hovered ? "#FFD8B8" : "transparent",
      };
    case "m_outline":
      return {
        maxWidth: "fit-content",
        height: "32px",
        fontSize: "14px",
        fontWeight: "500",
        border: "1px solid #FF7000",
        color: hovered ? "#FF7000" : "#FF7000",
        backgroundColor: hovered ? "#FFD8B8" : "transparent",
      };
    default:
      return {};
  }
};
