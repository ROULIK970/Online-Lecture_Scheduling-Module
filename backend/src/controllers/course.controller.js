import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const addCourse = asyncHandler(async(req,res) =>{
    //get name, level, description from frontend

    const {name, level, description} = req.body

    //check if fields are not left empty
    if (
    [name, level, description].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }


//check if such course already exists
  const existingCourse = await Course.findOne({ name });
        if (existingCourse) {
            throw new ApiError(400, "Course with name already exists")
        }

        //get localpath of image
     const imageLocalPath = req.files?.image[0]?.path;


//upload to cloudinary
     const image = await uploadOnCloudinary(imageLocalPath);

     //create new course in db
     const newCourse = await Course.create({
    name,
    level,
    description,
    image: image?.url || "",
  });

  const createdCourse = await Course.findById(newCourse._id)

  if(!createdCourse){
    throw new ApiError(500, "Server Error")
  }

   return res
    .status(201)
    .json(new ApiResponse(201, createdCourse, "Course created successfully"));
})




const fetchAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  if (!courses || courses.length === 0) {
    throw new ApiError(404, "No courses found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses fetched successfully"));
});


export {addCourse, fetchAllCourses}