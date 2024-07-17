import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;

  & img {
    width: 36px;
    height: 36px;
  }
  & span {
    font-size: 16px;
    line-height: 24px;
  }
  & span strong {
    display: block;
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
