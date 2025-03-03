import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createInstructor } from "../features/instructor/instructorSlice.js";

const AddInstructor = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password:"" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createInstructor(formData)).then(() => onClose());
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold">Add Instructor</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Add
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

export default AddInstructor;
