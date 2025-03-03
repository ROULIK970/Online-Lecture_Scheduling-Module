import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "http://localhost:3000/api/v1/admin/lectures";

export const scheduleLecture = createAsyncThunk(
  "lectures/schedule",
  async (lectureData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/schedule-lecture`,
        lectureData,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to schedule lecture"
      );
    }
  }
);


// Async Thunk to fetch all lectures
export const fetchLectures = createAsyncThunk("lectures/fetchAll", async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-lectures`, {
      withCredentials: true,
    });
    console.log(response)
    return response.data.data;
  } catch (error) {
    console.log(error)
    throw error.response?.data?.message || "Failed to fetch lectures";
  }
});

export const fetchInstructorLectures = createAsyncThunk(
  "lectures/fetchInstructor",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/instructor/get-my-lectures",
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Failed to fetch instructor lectures"
      );
    }
  }
);


// Redux Slice
const lectureSlice = createSlice({
  name: "lectures",
  initialState: {
    lectures: [],
    myLectures:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(scheduleLecture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scheduleLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures.push(action.payload);
      })
      .addCase(scheduleLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(fetchLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Instructor's Lectures
      .addCase(fetchInstructorLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.myLectures = action.payload; 
      })
      .addCase(fetchInstructorLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default lectureSlice.reducer;
