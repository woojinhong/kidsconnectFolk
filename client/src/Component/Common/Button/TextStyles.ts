import styled from 'styled-components';

interface StyledTextProps {
  isHovered: boolean;
}

export const TextStyles = styled.span<StyledTextProps>`
  font-weight: ${(props) => (props.isHovered ? 500 : 400)};
  color: ${(props) => (props.isHovered ? '#FF7000' : 'inherit')};
  cursor: pointer;
`;
