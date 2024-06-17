import { configureStore } from "@reduxjs/toolkit";
import matchingSurveySlice from "./Slices/MatchingSurveySlice";

export const store = configureStore({
  reducer: {
    preferenceData: matchingSurveySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
