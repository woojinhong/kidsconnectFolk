import styled from "styled-components";
import ColorTheme from "../../../../Assets/StyledData/ColorTheme";

const { primaryColor, black, white, gray1, gray2, lightGray1, lightGray2 } =
  ColorTheme;

export const StyledCardContainer = styled.li`
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0 24px;
  border-bottom: 1px solid ${lightGray2};
`;

export const StyledTextInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

export const StyledSymptomWrapper = styled.div`
  font-size: 0;
  margin-bottom: 16px;
  & > span {
    margin-right: 4px;
  }
`;

export const StyledChildInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > ul li {
    display: inline-block;
    font-size: 16px;
    line-height: 24px;
    margin-right: 4px;
  }
  & > ul li:first-child {
    font-weight: 800;
    margin-right: 2px;
  }
  & li img {
    width: 14px;
    height: 14px;
    vertical-align: -2px;
  }

  & > p {
    margin: 0;
    line-height: 20px;
  }
`;

export const StyledAlertWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 0 24px 0 16px;
  background-color: ${lightGray2};
  line-height: 36px;
  border-radius: 8px;

  & > div {
    font-weight: 800;
  }
  & > div > img {
    vertical-align: -4px;
    margin-right: 4px;
  }

  & > address {
    font-style: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const StyledCheckboxWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
