import { createSlice } from "@reduxjs/toolkit";
import { getCookie, deleteCookie } from "../../components/Cookie/Cookie";

<<<<<<< HEAD
const tokenFromCookie = getCookie("token");
=======
const tokenFromStorage = localStorage.getItem("token");
>>>>>>> parent of 2dc03f7 (work in progress for rememberMe option)

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
<<<<<<< HEAD
      state.savedRememberMe = action.payload.rememberMe;
      localStorage.setItem("savedRememberMe", action.payload.rememberMe);
      if (action.payload.rememberMe) {
        localStorage.setItem("token", action.payload.token);
      } else {
        localStorage.removeItem("token");
      }
=======

      localStorage.setItem("token", action.payload.token);
>>>>>>> parent of 2dc03f7 (work in progress for rememberMe option)
    },
    loginFailure(state, action) {
      state.token = null;
      state.error = action.payload;
<<<<<<< HEAD
      deleteCookie("token");
=======

      localStorage.removeItem("token");
>>>>>>> parent of 2dc03f7 (work in progress for rememberMe option)
    },
    logout(state) {
      state.token = null;
      state.error = null;
<<<<<<< HEAD
      deleteCookie("token");
    }
  },
});

export const { loginSuccess, loginFailure, logout, saveEmail } = authSlice.actions;
=======

      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, loginFailure, logout, initializeAuth } = authSlice.actions;

>>>>>>> parent of 2dc03f7 (work in progress for rememberMe option)
export default authSlice.reducer;
