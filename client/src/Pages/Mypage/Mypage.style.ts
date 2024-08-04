import styled from "styled-components";
import ColorTheme from "../../Assets/StyledData/ColorTheme";

export const StyledMypageLayout = styled.div`
  display: flex;
  width: 1060px;
  gap: 56px;
  padding: 40px 0 96px;
  margin: 0 auto;

  & > div {
    width: 100%;
    flex: 1;
  }

  & > section {
    width: 100%;
    overflow: hidden;
  }

  & h4 {
    margin: 0;
  }
`;

export const StyledMain = styled.div`
  & h3 {
    font-size: 16px;
    margin: 0 0 24px;
  }
  & > div:first-child {
    margin-bottom: 40px;
  }
  & > div > div {
    padding: 64px;
    background-color: #ffffff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
    border-radius: 24px;
  }

  & > div.therapist_profile > div {
    padding: 40px;
  }
`;

//Parents Side CSS
export const StyledProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  & > div {
    display: flex;
    align-items: center;
  }

  & img {
    width: 40px;
    height: 40px;
  }
  & h4 {
    margin: 0 0 0 8px;
    font-size: 24px;
    font-weight: 400;
  }
  & h4 span {
    margin-right: 4px;
    font-weight: 700;
  }
`;

export const StyledAdressContainer = styled.ul`
  color: ${ColorTheme.gray1};
  font-weight: 500;

  & li:first-child {
    color: ${ColorTheme.black};
  }

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${ColorTheme.lightGray1};
    margin: 16px 0 32px;
  }
`;

export const StyledContentContainer = styled.div`
  & > div:first-child {
    margin-bottom: 32px;
  }

  & h4 {
    margin: 0 0 16px 4px;
  }
  & h4 span {
    margin-left: 4px;
    color: ${ColorTheme.primaryColor};
  }

  & .childList > ul {
    overflow-x: scroll;
  }
`;

export const StyledEmptyReviewContainer = styled.div`
  width: 100%;
  padding: 40px 0 40px;
  background-color: ${ColorTheme.lightGray2};
  border-radius: 16px;
  text-align: center;

  & > h4 {
    margin: 0;
    font-weight: 500;
  }
`;

export const StyledMatchingContainer = styled.div`
  & h4 {
    margin-bottom: 16px;
  }

  & h4 span {
    margin-left: 4px;
    color: ${ColorTheme.primaryColor};
  }
  & > div:first-child:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    margin: 32px 0 32px;
    background-color: ${ColorTheme.lightGray1};
  }

  & > div > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

// Therapist Side CSS
export const StyledTherapistProfileContainer = styled.div`
  & > div {
    padding: 40px;
  }
`;

export const StyledProfileSummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    gap: 24px;
  }
`;

export const StyledProfileImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  border-radius: 100%;
  background: linear-gradient(
    126deg,
    rgba(222, 229, 255, 1) 29%,
    rgba(149, 173, 255, 1) 100%
  );

  & > img {
    width: 80px;
    height: 80px;
    border: 1px solid ${ColorTheme.lightGray1};
    border-radius: 100%;
  }
`;

export const StyledProfileTextContainer = styled.div`
  & h4 {
    font-size: 24px;
  }
  & h4 span {
    margin-left: 4px;
    font-weight: 400;
  }

  & .review {
    font-size: 13px;
  }
  & .review img {
    width: 16px;
    height: 16px;
  }
  & .review span {
    margin-left: 4px;
  }
  & > span {
    font-weight: 700;
  }
  & > span > i {
    font-weight: 400;
    font-style: normal;
  }
`;

export const StyledPortfolioContainer = styled.div`
  width: 100%;
  text-align: center;
  & > div {
    padding: 40px 80px;
    background-color: ${ColorTheme.lightGray2};
    border-radius: 16px;
    border: 1px solid ${ColorTheme.lightGray1};
  }

  & > div > div {
    margin-bottom: 24px;
  }
  & strong {
    font-size: 32px;
  }
  & h4 {
    font-size: 18px;
  }

  & span {
    font-size: 13px;
  }
`;

export const StyledReservationContainer = styled.div`
  & h4 span {
    margin-left: 4px;
    color: ${ColorTheme.primaryColor};
  }
  & i {
    font-size: 13px;
    font-style: normal;
    color: ${ColorTheme.gray2};
  }

  & > div:first-child {
    margin-bottom: 32px;
  }
`;

export const StyledEvaluationContainer = styled.div`
  & > div > h4 {
    margin-bottom: 16px;
  }
  & h4 span {
    margin-left: 4px;
    color: ${ColorTheme.primaryColor};
  }
`;
