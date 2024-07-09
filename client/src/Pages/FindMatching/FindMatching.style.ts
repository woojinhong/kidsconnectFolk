import styled from "styled-components";
import ColorTheme from "../../Assets/StyledData/ColorTheme";

export const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;

export const StyledFilterContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 1060px;
  margin: 0 auto;
  padding: 40px 0 48px;
`;

export const StyledSymptomContainer = styled.div`
  display: flex;
  gap: 16px;
  margin: 0 auto;

  & > div:first-child {
    position: relative;
    margin-right: 46px;
  }
  & > div:first-child:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    right: -30px;
    width: 1px;
    height: 100%;
    background-color: ${ColorTheme.lightGray1};
  }
`;

export const StyledFilterButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledTherapistCardContainer = styled.section`
  display: flex;
  flex-direction: column;

  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${ColorTheme.lightGray1};
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    width: 1060px;
    margin: 0 auto;
    padding: 64px 0 80px;
  }

  & > div > div {
    flex-basis: calc(50% - 12px);
  }
`;
