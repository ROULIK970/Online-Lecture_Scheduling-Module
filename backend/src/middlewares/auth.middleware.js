import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request!");
    }

        const decodedWithoutVerify = jwt.decode(token);

    const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);

    if(!decodedToken){
      console.log('cant decode token')
      throw new ApiError(401, "Can decode token")
    }

   
    const user = await User.findById(decodedToken?._id).select("-password");  
    if (!user) {
      throw new ApiError(401, "Invalid token!");
    }


    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(500, "Error decoding Token!");
  }
});

export const verifyAdmin = asyncHandler(async (req, _, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    throw new ApiError(403, "Access denied. Admins only!");
  }

  next();
});

