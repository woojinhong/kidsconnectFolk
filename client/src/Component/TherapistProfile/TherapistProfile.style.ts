import styled from "styled-components";
import ColorTheme from "../../Assets/StyledData/ColorTheme";

export const StyledPortfolioContainer = styled.div`
  background-color: ${ColorTheme.white};
  border-radius: 24px;
  padding: 72px;
  margin-bottom: 120px;

  & > h3 {
    font-size: 26px;
    margin: 0;
    margin-bottom: 72px;
    text-align: center;
  }

  & h4 {
    margin: 0 0 16px;
  }
  & p {
    margin: 0;
  }
`;

export const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const StyledSymptomContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const StyledCareerContainer = styled.div`
  & > div {
    width: 100%;
    padding: 16px 0 16px;
    text-align: center;
    background-color: #fff0e5;
    border-radius: 16px;
  }
  & > div > span {
    color: ${ColorTheme.primaryColor};
    font-weight: 800;
    margin-right: 3px;
  }
  & > ul {
    margin: 8px 0 0;
    display: flex;
    gap: 16px;
  }
  & > ul span {
    font-weight: 700;
  }
  & > ul li:after {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    background-color: #999999;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 16px;
  }
  & > ul li:last-child:after {
    display: none;
  }
`;
