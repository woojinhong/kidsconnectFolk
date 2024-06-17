import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid #c1c1c1;
  background-color: #ffffff;

  & main {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 1060px;
    gap: 40px;
  }

  & h1 {
    height: 100%;
  }

  & h1 img {
    width: 120px;
  }
`;

export const StyledContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  & > section {
    display: flex;
    flex-direction: row;
  }
`;

export const StyledProfileContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 12px;
  & .notification {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  & .notification > img {
    width: 24px;
    height: 24px;
  }

  & .profile img {
    width: 24px;
    height: 24px;
  }
`;

export const StyledLinkButton = styled(Link)`
  display: flex;
  flex-direction: row;
  background-color: transparent;
  color: #333;
  text-decoration: none;

  & span {
    transition: 0.2s;
  }

  &.signup > div {
    width: 84px;
  }
  &.signup > div span {
    font-weight: 600;
  }

  &.mypage {
    display: flex;
    align-items: center;
  }
  &.mypage h4 {
    padding: 10px 0 6px 12px;
    margin: 0 4px 0 0;
    vertical-align: -2px;
  }
  &.mypage h4 span {
    font-weight: 400;
    margin-left: 4px;
  }
`;
