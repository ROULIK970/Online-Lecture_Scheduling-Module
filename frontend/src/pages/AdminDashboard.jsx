import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructors } from "../features/instructor/instructorSlice.js";
import { fetchCourses } from "../features/course/courseSlice.js";
import { fetchLectures } from "../features/lecture/lectureSlice.js";
import { logoutUser } from "../features/auth/authSlice.js";
import {  useNavigate } from "react-router-dom";
import AddCourse from "../components/AddCourse.jsx";
import ScheduleLecture from "../components/ScheduleLecture.jsx";

const AdminDashboard = () => {
  const [showCourseModal, setCourseShowModal] = useState(false);
  const [showLectureModal, setLectureShowModal] = useState(false);
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
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Admin Dashboard
        </h1>
        {/* Instructor Management */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Instructor Management
          </h2>
          {instructorLoading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {instructors.map((inst) => (
                <li
                  key={inst._id}
                  className="bg-blue-100 p-3 rounded-lg shadow"
                >
                  <span className="font-semibold">{inst.name}</span> -{" "}
                  {inst.email}
                </li>
              ))}
            </ul>
          )}
        </section>
        {/* course management and lecture schedule */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Course Management & Lecture Scheduling
          </h2>
          {courseLoading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <ul className="space-y-6">
              {courses.map((course) => {
                // Get lectures related to the current course
                const relatedLectures = lectures.filter(
                  (lecture) => lecture.course.name === course.name
                );

                return (
                  <li
                    key={course._id}
                    className="bg-green-100 p-4 rounded-lg shadow"
                  >
                    <img
                      src={course.image || "default-image.jpg"}
                      alt={course.name}
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <p className="font-semibold text-lg">
                      Title: {course.name}
                    </p>
                    <p>Level: {course.level}</p>
                    <p>Description: {course.description}</p>

                    {/* Display Lectures Under the Course */}
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold text-purple-600">
                        Scheduled Lectures
                      </h3>
                      {relatedLectures.length > 0 ? (
                        <ul className="space-y-2 mt-2">
                          {relatedLectures.map((lecture) => (
                            <li
                              key={lecture._id}
                              className="bg-purple-100 p-3 rounded-lg shadow"
                            >
                              <p className="font-semibold">{lecture.details}</p>
                              <p>Instructor: {lecture.instructor.name}</p>
                              <p>
                                Date:{" "}
                                {new Date(lecture.date).toLocaleDateString()}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">
                          No lectures scheduled yet.
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => setCourseShowModal(!showCourseModal)}
              >
                {" "}
                {showCourseModal ? "Close Form" : "+ Add Course"}
              </button>
              {showCourseModal && (
                <AddCourse
                  onClose={() => setCourseShowModal(!showCourseModal)}
                />
              )} {" "}
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => setLectureShowModal(!showLectureModal)}
              >
                {" "}
                {showLectureModal ? "Close Form" : "+ Schedule Lecture"} 
              </button>
              {showLectureModal && (
                <ScheduleLecture
                  onClose={() => setLectureShowModal(!showLectureModal)}
                />
              )}
            </ul>
          )}
        </section>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
