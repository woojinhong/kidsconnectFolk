import styled from "styled-components";
import ColorTheme from "../../Assets/StyledData/ColorTheme";

const backgroundRound = (top: number, left: number) => {
  return `
          content: "";
      position: absolute;
      top: ${top}px;
      left: ${left}px;
      width: 400px;
      height: 400px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 100%;
      z-index:0;
      `;
};

export const IndexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  gap: 80px;
  width: 100vw;
  overflow: hidden;

  & section {
    width: 1060px;
    margin: 0 auto;
  }

  & section:first-child {
    width: 100%;
  }
  & section h3 {
    margin: 0;
    font-size: 18px;
  }
`;

export const MainBannerContainer = styled.div`
  position: relative;
  padding: 64px 0 64px;
  overflow: hidden;
  background: linear-gradient(
    331deg,
    rgba(255, 228, 206, 1) 29%,
    rgba(255, 246, 167, 1) 100%
  );

  & > div {
    position: relative;
    z-index: 2;
  }
  & > div:first-child {
    margin: 0 auto;
    text-align: center;
  }

  & h2 {
    margin: 0 0 8px;
    font-size: 32px;
    font-weight: 400;
    line-height: 40px;
  }

  & h2 span {
    font-weight: 700;
  }

  & > div > strong {
    font-weight: 400;
    color: ${ColorTheme.gray1};
  }

  & > div:last-child {
    margin: 0 auto;
    width: 364px;
  }
  &:before {
    ${backgroundRound(0, 0)}
  }

  &:after {
    ${backgroundRound(400, 400)}
  }

  & button {
    width: 364px;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 40px 0 32px;
  gap: 24px;
`;

export const RecommendSitesContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;

  & ul {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
  & li {
    position: relative;
    text-align: center;
  }
  & li > img {
    height: 240px;
    border-radius: 16px;
  }

  & li > a {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    align-items: center;
    transform: translate(-50%, -50%);
    color: ${ColorTheme.black};
    text-decoration: none;
  }

  & li > a img {
    display: block;
  }

  & li > a strong {
    font-weight: 500;
  }
  & li:first-child > a img {
    width: 240px;
  }
  & li:nth-child(2) > a img {
    width: 110px;
  }
  & li:nth-child(3) > a img {
    width: 82px;
  }
  & li:nth-child(4) > a img {
    width: 140px;
  }
`;

export const StyledTopTherapistContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 1060px;
  overflow: hidden;
  gap: 32px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }

  & > div > a {
    flex: 1;
  }
`;

export const StyledSubBanner = styled.section`
  display: block;
  background-color: ${ColorTheme.primaryColor};
  border-radius: 16px;
  color: ${ColorTheme.white};

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 24px 8px 30px;
  }

  & h4 {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }
  & h4 span {
    font-weight: 400;
  }
  & img {
    width: 480px;
  }
`;
