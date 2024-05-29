import styled from "styled-components";

interface StyledTextProps {
  isHovered: boolean;
}

export const TextStyles = styled.span<StyledTextProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: ${(props) => (props.isHovered ? 500 : 400)};
  color: ${(props) => (props.isHovered ? "#FF7000" : "inherit")};
  cursor: pointer;

  & img {
    width: 16px;
    height: 16px;
    padding-bottom: 3px;
  }
`;
