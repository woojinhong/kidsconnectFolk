import styled from 'styled-components';
import { ActionIcon } from '@mantine/core';

interface StyledActionIconProps {
  opacity?: number;
  border?: string;
  backgroundColor?: string;
  fontSize?: string;
  height?: string;
  width?: string;
  fontWeight?: string;
}

export const StyledActionIcon = styled(ActionIcon)<StyledActionIconProps>`
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
  width: ${(props) => props.width ?? '80px'};
  height: ${(props) => props.height ?? '80px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => props.opacity ?? 1};
  border: ${(props) => props.border ?? 'none'};
  border-radius: 16px;
`;

interface EmojiProps {
  isBordered: boolean;
  fontSize?: string;
  lineHeight?: string;
}

export const Emoji = styled.div<EmojiProps>`
  font-size: ${(props) => (props.isBordered ? props.fontSize ?? '24px' : '36px')};
  line-height: ${(props) => (props.isBordered ? props.lineHeight ?? '24px' : '36px')};
  margin-bottom: 8px;
`;

interface TextProps {
  isBordered: boolean;
  fontSize?: string;
  fontWeight?: string;
}

export const Text = styled.div<TextProps>`
  font-size: ${(props) => (props.isBordered ? props.fontSize ?? '14px' : '16px')};
  font-weight: ${(props) => props.fontWeight ?? '700'};
`;
