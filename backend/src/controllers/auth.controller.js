import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const token = await user.generateToken();

    return { token };
  } catch (e) {
    throw new ApiError(500, "Something went Wrong in server!");
  }
};

const registerUser = asyncHandler(async (req, res) => {
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
    throw new ApiError(409, "User with name or email already exists!");
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
    throw new ApiError(500, "Something went wrong while registering user");
  }

  //return json response

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
  //get user details from req.body
  const { email, name, password } = req.body;

  //check if emial or name is passed

  if (!(name || email)) {
    throw new ApiError(400, "Name or Email is required!");
  }

  //check for name or email in db
  const user = await User.findOne({
    $or: [{ name }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User with name or email doesn't exist!");
  }

  //check if password is valid
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Name or Password doesn't match!");
  }

  //generate token
  const { token } = await generateToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
  };

  //return response

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged in Successfully!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
  };

  res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "User Loggedout Successfully!"));
});

export { registerUser, loginUser, logoutUser };
