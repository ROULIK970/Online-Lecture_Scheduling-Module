import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

// Schedule a new lecture
const scheduleLecture = asyncHandler(async (req, res) => {
  const { courseId, instructorId, date, details } = req.body;

  // Check if all required fields are provided
  if (![courseId, instructorId, date].every(Boolean)) {
    throw new ApiError(400, "Course ID, Instructor ID, and Date are required");
  }

  // Check if the course exists
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Check if the date is valid
  const lectureDate = new Date(date);
  if (isNaN(lectureDate.getTime())) {
    throw new ApiError(400, "Invalid date format");
  }

  // Check if the instructor already has a lecture on the same date
  const existingLecture = await Lecture.findOne({
    instructor: instructorId,
    date: { $eq: new Date(date).toISOString().split("T")[0] },
  });

  if (existingLecture) {
    throw new ApiError(
      400,
      "Instructor already has a lecture scheduled on this date"
    );
  }

  // Create the lecture
  const newLecture = await Lecture.create({
    course: courseId,
    instructor: instructorId,
    date: lectureDate,
    details,
  });

  // Add the lecture to the course's lectures array
  course.lectures.push(newLecture._id);
  await course.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newLecture, "Lecture scheduled successfully"));
});

export { scheduleLecture };
