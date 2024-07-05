import styled from "styled-components";

export const StyledFooterContainer = styled.footer`
  font-size: 14px;
  background-color: #ffffff;

  & > div {
    display: flex;
    justify-content: space-between;
    padding: 40px 0 120px;
    width: 1060px;
    margin: 0 auto;
  }

  & > div > div {
    display: flex;
    flex-direction: row;
  }

  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #c1c1c1;
  }
`;

export const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 100px;

  & img {
    width: 100px;
    margin-bottom: 4px;
  }
`;

export const StyledDeveloperContainer = styled.section`
  display: flex;
  gap: 28px;
  color: #999999;

  & ul li {
    margin-bottom: 4px;
  }
  & ul:first-child {
    color: #c1c1c1;
  }
`;

export const StyledGithubLinkContainer = styled.section`
  & div a {
    display: flex;
    align-items: center;
    padding: 4px 12px 4px;
    gap: 8px;
    border-radius: 16px;
    background-color: #f2f2f2;
    color: #333333;
    text-decoration: none;
    transition: all 0.3s;
  }

  & div a:hover {
    background-color: #ffd8b8;
  }

  & div a span {
    font-size: 12px;
    font-weight: 500;
    padding-top: 4px;
  }
`;
