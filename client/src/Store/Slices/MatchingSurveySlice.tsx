import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PreferenceSurveyState {
  treatmentArea: string[];
  preference: {
    gender: string | undefined;
    career: boolean;
  };
}

const initialState: PreferenceSurveyState = {
  treatmentArea: [],
  preference: {
    gender: "",
    career: false,
  },
};

const matchingSurveySlice = createSlice({
  name: "preferenceData",
  initialState,
  reducers: {
    setTreatmentAreaPreference: (
      state,
      action: PayloadAction<treatmentAreaType>
    ) => {
      state.treatmentArea = action.payload;
    },
    setGenderPreference: (state, action: PayloadAction<genderType>) => {
      state.preference.gender = action.payload;
    },
    setCareerPreference: (state, action: PayloadAction<careerType>) => {
      state.preference.career = action.payload;
    },
  },
});

export default matchingSurveySlice.reducer;
export const matchingSurveyActions = matchingSurveySlice.actions;

type genderType = string;
type careerType = boolean;
type treatmentAreaType = string[];
