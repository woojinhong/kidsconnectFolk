import styled from "styled-components";

export const StyledButtonWrapper = styled.div`
  display: block;
`;

export const getButtonStyles = (
  variant: string,
  hovered: boolean,
  borderColor: string
) => {
  switch (variant) {
    case "outline":
      return {
        width: "100%",
        height: "56px",
        fontSize: "16px",
        fontWeight: "700",
        border: `1px solid ${borderColor}`,
        color: hovered ? "#FF7000" : "#FF7000",
        backgroundColor: hovered ? "#FFD8B8" : "#ffffff",
        transition: "0.2s",
      };
    case "m_outline":
      return {
        width: "100%",
        height: "32px",
        fontSize: "14px",
        fontWeight: "500",
        border: `1px solid ${borderColor}`,
        color: hovered ? "#FF7000" : "#FF7000",
        backgroundColor: hovered ? "#FFD8B8" : "#ffffff",
        transition: "0.2s",
      };
    default:
      return {};
  }
};
