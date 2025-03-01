import { Router } from "express";
import { addCourse, fetchAllCourses } from "../controllers/course.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//admin protected route
router
  .route("/add-course")
  .post(
    upload.fields([{ name: "image", maxCount: 1 }]),
    verifyJWT,
    verifyAdmin,
    addCourse
  );

  router.route('/get-courses').get(verifyJWT, verifyAdmin, fetchAllCourses)

export default router;
