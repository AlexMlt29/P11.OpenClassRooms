import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token") || sessionStorage.getItem("token");

const initialState = {
  token: tokenFromStorage || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure(state, action) {
      state.token = null;
      state.error = action.payload;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
    logout(state) {
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
