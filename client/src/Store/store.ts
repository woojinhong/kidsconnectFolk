import { configureStore } from "@reduxjs/toolkit";
import matchingSurveySlice from "./Slices/MatchingSurveySlice";
import loginStatusSlice from "./Slices/LoginStatus";

export const store = configureStore({
  reducer: {
    preferenceData: matchingSurveySlice,
    loginStatus: loginStatusSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
