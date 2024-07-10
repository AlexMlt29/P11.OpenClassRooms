import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, deleteCookie } from "../../components/Cookie/Cookie";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const token = getCookie("token");
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        if (response.status === 401) {
          deleteCookie('token');
          throw new Error("Unauthorized: Invalid token");
        }
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ userName }, { rejectWithValue }) => {
    const token = getCookie("token");
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName }),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: null,
    error: null,
    loading: false,
  },
  reducers: {
    clearUserProfile(state) {
      state.userProfile = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = { ...state.userProfile, userName: action.payload.userName };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
