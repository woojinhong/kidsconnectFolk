import styled from "styled-components";

export const StyledNavigation = styled.aside`
  display: flex;
  flex-direction: column;
  width: 270px;
  padding: 56px 56px 140px;
  gap: 24px;
  border-radius: 24px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  & li {
    line-height: 40px;
    font-weight: 800;
    color: #999999;
  }
  & span {
    width: 100%;
    height: 1px;
    background-color: #f2f2f2;
  }
  & button {
    line-height: 40px;
    background-color: transparent;
    text-align: left;
    color: #999999;
  }
`;
