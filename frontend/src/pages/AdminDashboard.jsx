import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructors } from "../features/instructor/instructorSlice.js";
import { fetchCourses } from "../features/course/courseSlice.js";
import { fetchLectures } from "../features/lecture/lectureSlice.js";
import { logoutUser } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { instructors, loading: instructorLoading } = useSelector(
    (state) => state.instructors
  );
  const { courses, loading: courseLoading } = useSelector(
    (state) => state.courses
  );
  const { lectures, loading: lectureLoading } = useSelector(
    (state) => state.lectures
  );

  useEffect(() => {
    dispatch(fetchInstructors());
    dispatch(fetchCourses());
    dispatch(fetchLectures());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      {/* Instructor Management */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instructor Management</h2>
        {instructorLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {instructors.map((inst) => (
              <li key={inst._id}>
                Name: {inst.name} | Email: {inst.email}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Course Management */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Management</h2>
        {courseLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course._id}>
                Course: {course.title} | Level: {course.level}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Lecture Scheduling */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Lecture Scheduling</h2>
        {lectureLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {lectures.map((lecture) => (
              <li key={lecture._id}>
                {lecture.course.title} by {lecture.instructor.name} on{" "}
                {new Date(lecture.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
