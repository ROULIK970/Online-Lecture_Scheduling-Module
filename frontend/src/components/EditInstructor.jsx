import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editInstructor } from "../features/instructor/instructorSlice.js";

const EditInstructor = ({ instructor, onClose }) => {
  const [formData, setFormData] = useState({
    name: instructor.name,
    email: instructor.email,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editInstructor({ id: instructor._id, updates: formData })).then(
      () => onClose()
    );
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold">Edit Instructor</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white p-2 rounded w-full"
        >
          Update
        </button>
        <button
          type="button"
          className="mt-2 bg-gray-400 text-white p-2 rounded w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditInstructor;
