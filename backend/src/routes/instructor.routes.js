import { Router } from "express";
import {
  getAllInstructors,
  createInstructor,
  editInstructorDetails,
  getInstructorLectures,
} from "../controllers/instructor.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/get-my-lectures").get(verifyJWT, getInstructorLectures)

// admin protected routes

router
  .route("/admin/get-instructors")
  .get(verifyJWT, verifyAdmin, getAllInstructors);
router
  .route("/admin/create-instructor")
  .post(verifyJWT, verifyAdmin, createInstructor);
router
  .route("/admin/edit-instructor/:id")
  .put(verifyJWT, verifyAdmin, editInstructorDetails);

export default router;
