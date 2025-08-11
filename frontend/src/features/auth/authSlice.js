import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://online-lecture-scheduling-module-2.onrender.com/api/v1/users";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  }

);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, {
        withCredentials: true, // Allows cookies to be sent and received
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    
    return true;
  } catch (error) {
    console.log(error)
    throw error.response?.data?.message || "Logout failed";
  }
});

// Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
