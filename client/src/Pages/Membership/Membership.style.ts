import styled from "styled-components";
import ColorTheme from "../../Assets/StyledData/ColorTheme";

export const StyledMainContainer = styled.main`
  width: 552px;
  margin: 0 auto;
  padding: 40px 0 56px;

  & h3 {
    margin: 0;
  }
`;

export const StyledHeadContainer = styled.div`
  & h2 {
    margin: 0;
    font-size: 28px;
  }
  & span {
    color: ${ColorTheme.gray2};
  }
  & a {
    color: ${ColorTheme.primaryColor};
    text-decoration: none;
    font-weight: 600;
  }
`;

export const StyledSectionContainer = styled.section`
  background-color: ${ColorTheme.white};
  margin-top: 32px;
  padding: 56px;
  border-radius: 24px;
`;

export const StyledUserTypeContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;

  & h3 {
    font-size: 24px;
    font-weight: 700;
    color: ${ColorTheme.primaryColor};
    line-height: 34px;
  }
  & span {
    color: ${ColorTheme.gray2};
  }
`;

export const StyledFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const StyledNameInputContainer = styled.div`
  display: flex;
  gap: 16px;

  & > div:first-child {
    flex: 200px;
  }
`;

export const StyledDetailInfoContainer = styled.div`
  display: flex;
  gap: 16px;

  & > div {
    flex: 1;
  }
`;

export const StyledAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledNameGenderContainer = styled.div`
  display: flex;
  gap: 16px;
  & > div:first-child {
    flex: 248px;
  }

  & .m_8fdc1311 {
    font-weight: 700;
    font-size: 16px;
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 110px;
  }
`;

export const StyledCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
