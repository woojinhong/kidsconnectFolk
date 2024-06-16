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
    width: 158px;
    line-height: 40px;
    font-weight: 800;
  }
  & > button {
    line-height: 40px;
    background-color: transparent;
    text-align: left;
    color: #c1c1c1;
  }
  & > ul button {
    text-align: left;
    width: 100%;
    line-height: 40px;
    background-color: transparent;
    transition: all 0.2s;
  }
  & ul:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #f2f2f2;
  }

  & li button:hover {
    color: #999999;
  }
`;

export const getButtonStyles = (isFocused: boolean) => {
  if (isFocused) {
    return {
      color: "#333333",
    };
  } else return { color: "#c1c1c1" };
};
