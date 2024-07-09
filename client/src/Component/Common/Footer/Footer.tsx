import {
  StyledFooterContainer,
  StyledLogoContainer,
  StyledDeveloperContainer,
  StyledGithubLinkContainer,
} from "./styled";

import logoLetter from "../../../Assets/Image/LogoLetterOnly.svg";
import githubLogo from "../../../Assets/Image/GithubLogo.svg";

function Footer() {
  return (
    <StyledFooterContainer>
      <div>
        <div>
          <StyledLogoContainer>
            <img src={logoLetter} alt="키즈커넥트" />
            <span>kidsconnect@gmail.com</span>
          </StyledLogoContainer>
          <StyledDeveloperContainer>
            <ul>
              <li>백엔드</li>
              <li>프론트엔드</li>
            </ul>
            <ul>
              <li>홍우진</li>
              <li>오하은</li>
            </ul>
            <ul>
              <li>orolzleim@gmail.com</li>
              <li>heoh0613@gmail.com</li>
            </ul>
          </StyledDeveloperContainer>
        </div>
        <StyledGithubLinkContainer>
          <div>
            <a
              href="https://github.com/kidsConnection/kidsconnect"
              target="_blank"
            >
              <img src={githubLogo} alt="깃허브" />
              <span>Github</span>
            </a>
          </div>
        </StyledGithubLinkContainer>
      </div>
    </StyledFooterContainer>
  );
}

export default Footer;
