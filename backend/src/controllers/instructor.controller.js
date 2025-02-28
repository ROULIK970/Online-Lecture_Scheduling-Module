import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {Lecture} from "../models/lecture.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getAllInstructors = asyncHandler((_ ,res) =>{
    
    //find instructors in db through role
        const instructors = await User.find({role:"instructor"})

        //if can't find instructors, throw custom error
        if(!instructors){
            throw new ApiError(500, "Failed to fetch instructors!")
        }

        //return json response
        return res
        .status(200)
        .json(new ApiResponse(200, instructors, "Got all instructors successfully"))
   
})



const createInstructor = asyncHandler((req,res) =>{
    //get user data from req.body
  const { name, email, password } = req.body;

  //validate to see if fields are not empty
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  //check if user already exist
  const existedUser = await User.findOne({
    $or: [{ name }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "Instructor with name or email already exists!");
  }

  //then save to database
  const user = await User.create({
    name: name?.toLowerCase() || "",
    email,
    password,
  });

  //checking user creation
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating instructor");
  }

  //return json response

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "Instructor created successfully!"));


})


const editInstructorDetails = asyncHandler((req,res) =>{

     //get id from frontend
     const {id} = req.params

     //get changed properties from frontend
     const {name, email} = req.body

     if(!(name || email)){
        throw new ApiError(400, "Update fields are required!")
     }

     const updatedInstructor = await User.findByIdAndUpdate(id, { name, email }, { new: true });

     return res
    .status(200)
    .json(new ApiResponse(200, updatedInstructor, "Instructor account details upadated successfully"));

})


// Get all assigned lectures for the logged-in instructor
export const getInstructorLectures = asyncHandler(async (req, res) => {
    const instructorId = req.user._id; 

    // Find lectures for the instructor and populate course details
    const lectures = await Lecture.find({ instructor: instructorId })
        .populate("course", "name level description")
        .select("date details course");

    if (!lectures.length) {
        throw new ApiError(404, "No lectures found for this instructor");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, lectures, "Lectures retrieved successfully"));
});


export {getAllInstructors, createInstructor, editInstructorDetails, getInstructorLectures}