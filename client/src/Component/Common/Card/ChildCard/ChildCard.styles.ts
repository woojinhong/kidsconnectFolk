import { Card, Group, Text } from "@mantine/core";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  padding: 24px;
  width: 268px;
  height: 183px;
  border-radius: 16px;
  border: 1px solid #f2f2f2;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  &:nth-of-type(2) {
    background-color: #F2F2F2;
    cursor: pointer;
  }
`;

export const InfoGroup = styled(Group)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const DescriptionText = styled(Text)`
  font-size: 13px;
  line-height: 18.82px;
  color: #999999;
  height: 57px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const TagContainer = styled.div`
  display: flex;
  margin-top: 12px;

  & > div {
    margin-right: 6px;
  }
`;
