import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../features/course/courseSlice";

const AddCourse = ({onClose}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
    image: null,
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });


    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.level ||
      !formData.description ||
      !formData.image
    ) {
      alert("All fields are required!");
      return;
    }

    const courseData = new FormData();
    courseData.append("name", formData.name);
    courseData.append("level", formData.level);
    courseData.append("description", formData.description);
    courseData.append("image", formData.image);

    dispatch(addCourse(courseData));
    onClose()
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
        Add New Course
      </h2>
      <button
        className=" bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition"
        onClick={onClose}
      >
        &times;
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-gray-700">Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter course name"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-gray-700">Level</label>
          <input
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Beginner, Intermediate, Advanced"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter course description"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
