import { Router } from "express";
import { addCourse } from "../controllers/course.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//admin protected route
router
  .route("/")
  .post(
    upload.fields([{ name: "image", maxCount: 1 }]),
    verifyJWT,
    verifyAdmin,
    addCourse
  );

export default router;
