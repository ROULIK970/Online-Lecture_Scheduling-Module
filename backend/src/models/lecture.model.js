import mongoose, { Schema } from "mongoose";


const lectureSchema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    details: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);