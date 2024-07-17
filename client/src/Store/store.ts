import { combineReducers, configureStore } from "@reduxjs/toolkit";
import matchingSurveySlice from "./Slices/MatchingSurveySlice";
import loginStatusSlice from "./Slices/LoginStatus";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

const rootReducer = combineReducers({
  preferenceData: matchingSurveySlice,
  loginStatus: loginStatusSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["loginStatus"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
