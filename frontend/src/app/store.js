import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js"
import instructorReducer from "../features/instructor/instructorSlice.js";
import courseReducer from "../features/course/courseSlice.js";
import lectureReducer from "../features/lecture/lectureSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    instructors: instructorReducer,
    courses: courseReducer,
    lectures: lectureReducer,
  },

});

export default store;
