import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginStatusState {
  userType: string | undefined;
  isLogin: boolean;
}

const initialState: LoginStatusState = {
  userType: undefined,
  isLogin: false,
};

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<LoginStatusState>) => {
      state.userType = action.payload.userType;
      state.isLogin = action.payload.isLogin;
    },
    getLoginStatus: (action) => action,
  },
});

export default loginStatusSlice.reducer;
export const loginStatusActions = loginStatusSlice.actions;
