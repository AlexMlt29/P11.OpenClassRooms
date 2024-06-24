import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");

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

      localStorage.setItem("token", action.payload.token);
    },
    loginFailure(state, action) {
      state.token = null;
      state.error = action.payload;

      localStorage.removeItem("token");
    },
    logout(state) {
      state.token = null;
      state.error = null;

      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, loginFailure, logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
