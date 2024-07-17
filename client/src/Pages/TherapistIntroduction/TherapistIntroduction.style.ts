import styled from "styled-components";
import ColorTheme from "../../Assets/StyledData/ColorTheme";
import { StyledProfileContainer } from "../Mypage/Mypage.style";

export const StyledMainContainer = styled.main`
  width: 1060px;
  margin: 0 auto;
`;

export const StyledProfileSummaryContainer = styled(StyledProfileContainer)`
  background-color: transparent;
  padding: 0;
  width: 100%;
  justify-content: space-between;
`;

export const StyledSymptomContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const StyledNameContainer = styled.div`
  font-size: 28px;
  color: ${ColorTheme.primaryColor};
  & h4 {
    font-weight: 800;
    margin: 0;
  }
  & span {
    font-weight: 400;
    color: ${ColorTheme.black};
  }
`;
export const StyledTextSummaryContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & > div.review span {
    font-size: 16px;
  }
  & > div.career span {
    font-weight: 700;
  }
  & > div.isWorking span {
    font-weight: 700;
  }

  & > div:after {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    background-color: ${ColorTheme.black};
    border-radius: 100%;
    margin-left: 4px;
    vertical-align: middle;
  }
  & > div:last-child:after {
    display: none;
  }
`;
