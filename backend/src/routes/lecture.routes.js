import { Router } from "express";
import { scheduleLecture } from "../controllers/lecture.controller.js";

import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/').post(verifyJWT, verifyAdmin, scheduleLecture)

export default router;
