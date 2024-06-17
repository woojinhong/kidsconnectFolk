import styled from "styled-components";

export const TextStyles = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  & img {
    width: 16px;
    height: 16px;
    padding-bottom: 3px;
  }

  &:hover {
    font-weight: 500;
    color: #ff7000;
  }
`;
