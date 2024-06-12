import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Category from "../../Component/Common/Category/Category";
import SelectBoxDefault from "../../Component/Common/SelectBox/SelectBoxDefault";
import TherapistCard from "../../Component/Common/Card/TherapistCard/TherapistCard";

import { PreferenceSurveyState } from "../../Store/Slices/MatchingSurveySlice";
import treatmentAreaText from "../../Assets/TextData/treatmentAreaText";
import { getSelectedTreatmentArea } from "../../Services/CustomHooks";

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
  const [selectedCareer, setSelectedCareer] = useState<
    string | boolean | null
  >();
  const [selectedFilterBy, setSelectedFilterBy] = useState<string | null>();

  const checkedSurveyData = useSelector(
    (state: RootState) => state.preferenceData
  );

  useEffect(() => {
    setSurveyedData(checkedSurveyData);
    if (checkedSurveyData.treatmentArea) {
      setSelectedTreatmentArea(checkedSurveyData.treatmentArea);
    }
  }, []);
  // 추후 api
  const therapistId: number[] = [1, 2, 3, 4];

  return (
    <main>
      <section>
        <div>
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
        </div>
        <div>
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
        </div>
      </section>
      <section>
        <div>
          {therapistId.map((therapistId) => (
            <TherapistCard
              key={therapistId}
              therapistId={therapistId}
              variants="default"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default FindMatching;
