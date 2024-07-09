import styled from "styled-components";
import ColorTheme from "../../Assets/StyledData/ColorTheme";

export const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 1060px;
  margin: 0 auto;
  padding: 40px 0 160px;

  & h3 {
    margin: 0;
  }
  & h4 {
    margin: 0;
  }

  & > section {
    border-radius: 24px;
    background-color: #ffffff;
  }
  & > section:first-child {
    padding: 40px;
  }
  & > section:nth-child(2) {
    padding: 72px;
  }
`;

export const StyledFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const StyledCheckboxContainer = styled.div`
  & h4 {
    display: inline-block;
    margin-bottom: 16px;
  }
  & h4 span {
    font-weight: 400;
  }
  & > span {
    margin-left: 4px;
    color: ${ColorTheme.error};
  }

  & > div {
    display: flex;
    gap: 16px;
  }
`;

export const StyledCommonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  & > div > p {
    margin: 0;
    color: ${ColorTheme.gray2};
    font-size: 13px;
  }
`;

export const StyledCareerInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-weight: 700;

  & div:first-child {
    flex: 540px;
  }

  & div:nth-child(2) {
    flex: 100px;
  }

  & div:nth-child(3) {
    flex: 1;
  }
`;

export const StyledCareerButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledEducationInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  & > div {
    flex: 1;
  }

  & > div:first-child {
    flex: 0.5;
  }

  & > div:nth-child(2) {
    flex: 2;
  }

  & > div:last-child {
    flex: 0.5;
  }
`;

export const StyledCertificateContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 680px;
  flex-wrap: wrap;

  & > div:first-child {
    flex: 1.5;
  }
  & > div:last-child {
    flex: 0.5;
  }
`;

export const StyledIdentityCheckContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 16px;
  & > div {
    flex: 1;
  }
`;
