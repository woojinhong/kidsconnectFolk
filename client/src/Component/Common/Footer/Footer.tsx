import logoLetter from "../../../Assets/Image/LogoLetterOnly.svg";
import githubLogo from "../../../Assets/Image/GithubLogo.svg";

function Footer() {
  return (
    <footer>
      <div>
        <section>
          <img src={logoLetter} alt="키즈커넥트" />
          <span>kidsconnect@gmail.com</span>
        </section>
        <section>
          <ul>
            <li>백엔드 1</li>
            <li>백엔드 2</li>
            <li>프론트엔드 1</li>
            <li>프론트엔드 2</li>
          </ul>
          <ul>
            <li>홍우진</li>
            <li>구민수</li>
            <li>오성은</li>
            <li>오하은</li>
          </ul>
          <ul>
            <li>orolzleim@gmail.com</li>
            <li>midhuffle@gmail.com</li>
            <li>nnmmaz95@gmail.com </li>
            <li>heoh0613@gmail.com</li>
          </ul>
        </section>
        <section>
          <div>
            <a
              href="https://github.com/kidsConnection/kidsconnect"
              target="_blank"
            >
              <img src={githubLogo} alt="깃허브" />
              <span>Github</span>
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
