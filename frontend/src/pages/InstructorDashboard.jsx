import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorLectures } from "../features/lecture/lectureSlice"; 

const InstructorDashboard = () => {
  const dispatch = useDispatch();

  const { myLectures, loading, error } = useSelector((state) => state.lectures);

  useEffect(() => {
    dispatch(fetchInstructorLectures()); 
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Instructor Dashboard</h2>

      {error && <p className="text-gray-500 text-3xl">{error}</p>}

      {myLectures.length === 0 && !loading && !error ? (
        <p className="text-gray-500">No lectures scheduled yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myLectures.map((lecture) => (
            <div
              key={lecture._id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold">{lecture.course.name}</h3>
              <p className="text-gray-700">{lecture.course.description}</p>
              <p className="text-gray-700">{lecture.course.level}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(lecture.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Duration: {lecture.duration} minutes
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;
