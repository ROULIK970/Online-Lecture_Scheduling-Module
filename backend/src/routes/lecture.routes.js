import { Router } from "express";
import { fetchAllLectures, scheduleLecture } from "../controllers/lecture.controller.js";

import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route('/get-all-lectures').get(verifyJWT, verifyAdmin, fetchAllLectures)
router.route('/schedule-lecture').post(verifyJWT, verifyAdmin, scheduleLecture)

export default router;
