import styled from "styled-components";
import { Card, Text } from "@mantine/core";

export const ReviewContainer = styled.div``;

export const StyledCard = styled(Card)`
  width: 377px;
  padding: 16px;
  height: auto;
`;

export const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const StarImage = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 2px;
`;

export const UserName = styled.span`
  color: #333333;
  font-weight: 700;
`;

export const UserTitle = styled.span`
  color: #333333;
  font-weight: 400;
`;

export const CommentText = styled(Text)`
  color: #666666;
  font-weight: 400;
  &:nth-of-type(2) {
    margin-top: 8px;
    line-height: 17.38px;
  }
`;

export const Divider = styled.div`
  border: 1px solid #c1c1c1;
  margin-top: 10px;
`;
