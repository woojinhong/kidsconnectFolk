import styled from "styled-components";

export const StyledMain = styled.main`
  & h3 {
    font-size: 16px;
    margin: 0 0 24px;
  }
  & > section:first-child {
    margin-bottom: 40px;
  }
  & > section > div {
    background-color: #ffffff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 24px;
  }
`;

export const StyledProfileSummary = styled.div`
  padding: 40px;
`;
