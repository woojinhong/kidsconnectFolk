import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Modal from "../../Component/Common/Modal/Modal";
import Category from "../../Component/Common/Category/Category";
import TherapistCard from "../../Component/Common/Card/TherapistCard/TherapistCard";

import { getSelectedTreatmentArea } from "../../Services/CustomHooks";
import { matchingSurveyActions } from "../../Store/Slices/MatchingSurveySlice";
import { useGetTopTherapist } from "../../Services/ApiHooks";

import treatmentAreaText from "../../Assets/TextData/treatmentAreaText";
import externalRecommendSites from "../../Assets/TextData/externalRecommendSites";
import SubBannerImg from "../../Assets/Image/Banner/subBannerImg.png";

import {
  IndexContainer,
  MainBannerContainer,
  CategoryContainer,
  RecommendSitesContainer,
  StyledTopTherapistContainer,
  StyledSubBanner,
} from "./Index.style";

import { v4 as uuidv4 } from "uuid";

function Index() {
  const [topTherapistId, setTopTherapistId] = useState<TopTherapistType[]>([]);
  const [selectedTreatmentArea, setSelectedTreatmentArea] = useState<string[]>(
    []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopTherapistId = async () => {
      setTopTherapistId(await useGetTopTherapist());
    };
    fetchTopTherapistId();
  }, []);

  useEffect(() => {
    dispatch(
      matchingSurveyActions.setTreatmentAreaPreference(selectedTreatmentArea)
    );
  }, [selectedTreatmentArea]);

  return (
    <>
      <IndexContainer>
        <section style={{ backgroundColor: "#f2f2f2" }}>
          <MainBannerContainer>
            <div>
              <h2>
                <span>우리 아이,</span> 도울 수 있는
                <br />
                <span>선생님</span>을 찾아 드려요
              </h2>
              <strong>아래 필요한 도움을 선택하시고 찾아 보세요!</strong>
            </div>
            <CategoryContainer>
              {treatmentAreaText.map((category) => (
                <Category
                  key={category.text}
                  emoji={category.emoji}
                  text={category.text}
                  size="lg"
                  main={true}
                  setData={setSelectedTreatmentArea}
                  checkedData={selectedTreatmentArea}
                  onClick={getSelectedTreatmentArea}
                />
              ))}
            </CategoryContainer>
            <div>
              <Modal
                buttonText="선생님 찾아보기"
                content="therapistPreference"
                buttonIcon="search"
              />
            </div>
          </MainBannerContainer>
        </section>
        <RecommendSitesContainer>
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
        </RecommendSitesContainer>
        <StyledTopTherapistContainer>
          <h3>🏆 이 달의 인기 선생님</h3>
          <div>
            {topTherapistId?.map((data) => (
              <TherapistCard
                key={uuidv4()}
                therapistId={data.id}
                variants="summary"
              />
            ))}
          </div>
        </StyledTopTherapistContainer>
        <StyledSubBanner>
          <div>
            <div>
              <h4>키즈커넥트, 왜 만들어졌나요?</h4>
              <span>소개 보러가기</span>
            </div>
            <img src={SubBannerImg} />
          </div>
        </StyledSubBanner>
      </IndexContainer>
    </>
  );
}

export default Index;

type TopTherapistType = {
  id: number;
};

// css 오류
// key 오류
// Header userName 받아와야함
