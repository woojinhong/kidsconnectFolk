import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  & img {
    width: 24px;
    height: 24px;
  }
  & span {
    font-size: 16px;
    line-height: 24px;
  }
  &.xs {
    gap: 2px;
  }
  &.xs img {
    width: 16px;
    height: 16px;
  }
  &.xs span {
    font-size: 13px;
    line-height: 20px;
    color: #999999;
  }
`;
