import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL =
  "https://online-lecture-scheduling-module-2.onrender.com/api/v1/instructor";


export const fetchInstructors = createAsyncThunk(
  "instructors/fetchAll",
  async () => {
    const response = await axios.get(`${API_URL}/admin/get-instructors`, {
      withCredentials: true,
    });
    console.log(response)
    return response.data.data;
  }
);

// Create a new instructor
export const createInstructor = createAsyncThunk(
  "instructors/create",
  async (instructorData) => {
    const response = await axios.post(
      `${API_URL}/admin/create-instructor`,
      instructorData,
      { withCredentials: true }
    );
    return response.data.data;
  }
);

// Edit instructor details
export const editInstructor = createAsyncThunk(
  "instructors/edit",
  async ({ id, updates }) => {
    const response = await axios.put(`${API_URL}/admin/edit-instructor/${id}`, updates, {
      withCredentials: true,
    });
    return response.data.data;
  }
);

const instructorSlice = createSlice({
  name: "instructors",
  initialState: {
    instructors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all instructors
      .addCase(fetchInstructors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.loading = false;
        state.instructors = action.payload;
      })
      .addCase(fetchInstructors.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch instructors";
      })

      // Create a new instructor
      .addCase(createInstructor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.instructors.push(action.payload);
      })
      .addCase(createInstructor.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create instructor";
      })

      // Edit instructor details
      .addCase(editInstructor.pending, (state) => {
        state.loading = true;
      })
      .addCase(editInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.instructors = state.instructors.map((instructor) =>
          instructor._id === action.payload._id ? action.payload : instructor
        );
      })
      .addCase(editInstructor.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update instructor details";
      });
  },
});

export default instructorSlice.reducer;
