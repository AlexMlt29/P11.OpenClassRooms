import { createSlice } from "@reduxjs/toolkit";
import { getCookie, deleteCookie } from "../../components/Cookie/Cookie";

const tokenFromCookie = getCookie("token");

const initialState = {
  token: tokenFromCookie || localStorage.getItem("token") || null,
  error: null,
  savedRememberMe: localStorage.getItem("savedRememberMe") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.error = null;
      state.savedRememberMe = action.payload.rememberMe;
      localStorage.setItem("savedRememberMe", action.payload.rememberMe);
      if (action.payload.rememberMe) {
        localStorage.setItem("token", action.payload.token);
      } else {
        localStorage.removeItem("token");
      }
    },
    loginFailure(state, action) {
      state.token = null;
      state.error = action.payload;
      deleteCookie("token");
    },
    logout(state) {
      state.token = null;
      state.error = null;
      deleteCookie("token");
    }
  },
});

export const { loginSuccess, loginFailure, logout, saveEmail } = authSlice.actions;
export default authSlice.reducer;
