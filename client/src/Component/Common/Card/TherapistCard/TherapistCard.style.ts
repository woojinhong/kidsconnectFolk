import { Link } from "react-router-dom";
import styled from "styled-components";
import ColorTheme from "../../../../Assets/StyledData/ColorTheme";

const { primaryColor, black, white, gray1, gray2, lightGray1 } = ColorTheme;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${black};
`;

export const StyledTherapistCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid #c1c1c1;
  border-radius: 16px;
  gap: 16px;
  font-size: 14px;
  background-color: ${white};
  overflow: hidden;

  &.default {
    height: 290px;
  }
  &.applied {
    height: 278px;
  }
  &.summary {
    width: 100%;
    height: 306px;
    gap: 0;
  }
`;

export const StyledTagWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const StyledProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  justify-content: space-between;
  max-height: 64px;

  & .profile_wrapper {
    display: flex;
    flex-direction: row;
  }
  & .profile_wrapper img {
    width: 64px;
    height: 64px;
    border-radius: 100%;
    border: 1px solid ${lightGray1};
  }
  & .profile_wrapper ul {
    margin: 0 0 0 12px;
    padding: 0;
  }

  & .profile_name {
    font-size: 16px;
  }
  & .profile_name span {
    margin-right: 2px;
    font-weight: 800;
  }
  & .profile_career strong {
    margin-right: 4px;
    font-weight: 500;
    color: ${gray1};
  }
  & .profile_career span {
    display: block;
    margin-left: 2px;
    font-weight: 800;
    color: ${primaryColor};
  }

  & .profile_career i {
    color: ${gray1};
    font-style: normal;
  }
  & .profile_current_career {
    font-size: 12px;
  }
  & .profile_review span {
    margin-left: 4px;
    color: ${gray2};
    font-size: 13px;
    line-height: 20px;
  }

  &.profile_summary {
    flex-direction: column;
    gap: 8px;
    margin: 16px 0 8px;
    max-height: fit-content;
  }
  &.profile_summary ul {
    width: calc(100% - 76px);
  }
  &.profile_summary .profile_current_career {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const StyledContentWrapper = styled.div`
  width: 100%;
  color: ${gray2};
  height: 60px;
  & p {
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    line-height: 20px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &.content_summary {
    height: 120px;
  }

  &.content_summary p {
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    line-height: 20px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }
`;

export const StyledTherapistDetailContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${gray2};
  line-height: 20px;
  & span {
    margin-left: 8px;
    color: ${black};

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;

  &.button_wrapper_applied {
    gap: 16px;
  }
  &.button_wrapper_applied div:first-child span {
    color: ${gray1};
    font-weight: 400;
  }

  & > div {
    width: 100%;
    text-align: center;
  }

  & button {
    height: 48px !important;
  }

  & button > span {
    width: 100%;
    font-weight: 600;
  }
`;
