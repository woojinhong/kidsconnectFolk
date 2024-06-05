import styled from "styled-components";
import { Card, Text } from "@mantine/core";

export const ReviewContainer = styled.ul``;

export const StyledCard = styled(Card)`
  width: 100%;
  padding: 16px 0 0;
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
  margin-right: 4px;
  margin-bottom: 3px;
`;

export const UserName = styled.span`
  color: #333333;
  font-weight: 700;
`;

export const UserTitle = styled.span`
  color: #333333;
  font-weight: 400;
`;

export const CommentText = styled.span`
  color: #666666;
  font-weight: 400;
  font-size: 16px;
  &:nth-of-type(2) {
    margin-top: 8px;
    line-height: 17px;
    font-size: 14px;
  }
`;

export const Divider = styled.div`
  border: 1px solid #f2f2f2;
  margin-top: 16px;
`;

export const RatingText = styled.span`
  font-size: 13px;
  color: #999999;
`;
