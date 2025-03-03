import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scheduleLecture } from "../features/lecture/lectureSlice.js";

const ScheduleLecture = ({ onClose }) => {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses.courses);
  const instructors = useSelector((state) => state.instructors.instructors);

  const [formData, setFormData] = useState({
    courseId: "",
    instructorId: "",
    date: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =   (e) => {
    e.preventDefault();
    const lectureData = formData
     dispatch(scheduleLecture(lectureData));

    onClose()
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-purple-600">
        Schedule a Lecture
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Selection Dropdown */}
        <select
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        {/* Instructor Selection Dropdown */}
        <select
          name="instructorId"
          value={formData.instructorId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor._id}>
              {instructor.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="details"
          placeholder="Lecture Details"
          value={formData.details}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition w-full"
        >
          Schedule Lecture
        </button>
      </form>

      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition"
      >
        &times;
      </button>
    </div>
  );
};

export default ScheduleLecture;
