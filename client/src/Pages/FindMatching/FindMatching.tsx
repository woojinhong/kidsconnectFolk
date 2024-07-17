import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Category from "../../Component/Common/Category/Category";
import SelectBoxDefault from "../../Component/Common/SelectBox/SelectBoxDefault";
import TherapistCard from "../../Component/Common/Card/TherapistCard/TherapistCard";

import { PreferenceSurveyState } from "../../Store/Slices/MatchingSurveySlice";
import treatmentAreaText from "../../Assets/TextData/treatmentAreaText";
import { getSelectedTreatmentArea } from "../../Services/CustomHooks";
import { useGetFilteredTherapist } from "../../Services/ApiHooks";

import {
  StyledMainContainer,
  StyledFilterContainer,
  StyledSymptomContainer,
  StyledFilterButtonContainer,
  StyledTherapistCardContainer,
} from "./FindMatching.style";

interface RootState {
  preferenceData: PreferenceSurveyState;
}

function FindMatching() {
  const [surveyedData, setSurveyedData] = useState<PreferenceSurveyState>();
  const [selectedTreatmentArea, setSelectedTreatmentArea] = useState<string[]>(
    []
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>();
  const [selectedGender, setSelectedGender] = useState<string | null>();
  const [selectedCareer, setSelectedCareer] = useState<string | null>();
  const [selectedFilterBy, setSelectedFilterBy] = useState<string | null>();
  const [allTherapistData, setAllTherapistData] = useState<any[]>();

  const { getFilteredTherapist } = useGetFilteredTherapist();

  const checkedSurveyData = useSelector(
    (state: RootState) => state.preferenceData
  );

  useEffect(() => {
    setSurveyedData(checkedSurveyData);
    if (checkedSurveyData.treatmentArea) {
      setSelectedTreatmentArea(checkedSurveyData.treatmentArea);
    }
  }, []);
  useEffect(() => {
    const fetchFilteredTherapist = async () => {
      const filteredTherapistData =
        surveyedData &&
        (await getFilteredTherapist(surveyedData, selectedRegion || ""));
      setAllTherapistData(filteredTherapistData);
    };
    fetchFilteredTherapist();
  }, [checkedSurveyData, surveyedData, selectedRegion]);

  useEffect(() => {
    setSurveyedData((prevState) => {
      if (!prevState) return;
      return {
        ...prevState,
        treatmentArea: selectedTreatmentArea,
        preference: {
          ...prevState.preference,
          gender: selectedGender || prevState.preference.gender,
          career: true,
        },
      };
    });
  }, [selectedTreatmentArea, selectedGender, selectedCareer, selectedFilterBy]);

  return (
    <StyledMainContainer>
      <StyledFilterContainer>
        <StyledSymptomContainer>
          {treatmentAreaText.map((category) => (
            <Category
              key={category.text}
              emoji={category.emoji}
              text={category.text}
              size="lg"
              onClick={getSelectedTreatmentArea}
              checkedData={selectedTreatmentArea}
              setData={setSelectedTreatmentArea}
            />
          ))}
        </StyledSymptomContainer>
        <StyledFilterButtonContainer>
          <SelectBoxDefault
            category="userRegion"
            getData={setSelectedRegion}
            defaultSelectedValue="전체"
            variants="filled"
            size="sm"
            width="80px"
          />
          <SelectBoxDefault
            category="career"
            getData={setSelectedCareer}
            defaultSelectedValue={surveyedData?.preference.career.toString()}
            size="sm"
          />
          <SelectBoxDefault
            category="gender"
            getData={setSelectedGender}
            defaultSelectedValue={surveyedData?.preference.gender}
            size="sm"
          />
          <SelectBoxDefault
            category="filterBy"
            getData={setSelectedFilterBy}
            size="sm"
            defaultSelectedValue="최신순"
          />
        </StyledFilterButtonContainer>
      </StyledFilterContainer>
      <StyledTherapistCardContainer>
        <div>
          {allTherapistData?.map((therapist) => (
            <TherapistCard
              key={therapist.therapistId}
              therapistId={therapist.therapistId}
              variants="default"
            />
          ))}
          {allTherapistData?.length === 0 ? (
            <div>아직 등록된 선생님이 없어요!</div>
          ) : null}
        </div>
      </StyledTherapistCardContainer>
    </StyledMainContainer>
  );
}

export default FindMatching;
