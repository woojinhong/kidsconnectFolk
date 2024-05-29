import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // slice 입력하기
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
