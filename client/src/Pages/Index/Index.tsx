import Footer from "../../Component/Common/Footer/Footer";
import Header from "../../Component/Common/Header/Header";

import Modal from "../../Component/Common/Modal/Modal";
import TherapistPreference from "../../Component/Common/Modal/ModalContent/TherapistPreference";
import TherapistCard from "../../Component/Common/Card/TherapistCard/TherapistCard";

import externalRecommendSites from "../../Assets/TextData/externalRecommendSites";
import SubBannerImg from "../../Assets/Image/Banner/subBannerImg.png";

function Index() {
  // 추후 api 받아와서 id 찾기
  const therapistIdThisMonth: number[] = [4, 3, 1, 2];

  return (
    <>
      <Header />
      <main>
        <section style={{ backgroundColor: "#f2f2f2" }}>
          <div>
            <div>
              <h2>
                <strong>우리 아이,</strong> 도울 수 있는 <strong>선생님</strong>
                을 찾아 드려요
              </h2>
              <span>아래 필요한 도움을 선택하시고 찾아 보세요!</span>
            </div>
            <div>
              {/* Todo: 카테고리 컴퍼넌트 map */}
              체크박스~
            </div>
            <Modal
              buttonText="선생님 찾아보기"
              content={TherapistPreference}
              buttonIcon="search"
            />
          </div>
        </section>
        <section>
          <h3>💡 우리 아이에게 필요한 도움 찾기</h3>
          <ul>
            {externalRecommendSites.map((site, index) => (
              <li key={index}>
                <img src={site.backgroundImage} />
                <a href={site.link} target="_blank">
                  <img src={site.logo} alt={site.alt} />
                  {site.ageRange ? <span>{site.ageRange}</span> : null}
                  <strong>{site.text}</strong>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3>🏆 이 달의 인기 선생님</h3>
          <div>
            {therapistIdThisMonth.map((therapistId) => (
              <TherapistCard
                key={therapistId}
                variants="summary"
                therapistId={therapistId}
              />
            ))}
          </div>
        </section>
        <section>
          <div>
            <div>
              <h4>키즈커넥트, 왜 만들어졌나요?</h4>
              <span>소개 보러가기</span>
            </div>
            <img src={SubBannerImg} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Index;
