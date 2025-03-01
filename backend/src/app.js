import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//allows the backend to specify which origins (domains) are allowed to access its resources.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes

import authRouter from './routes/auth.routes.js'
import instructorRouter from './routes/instructor.routes.js'
import courseRouter from "./routes/course.routes.js";
import lectureRouter from "./routes/lecture.routes.js"

app.use('/api/v1/users', authRouter)
app.use("/api/v1/instructor", instructorRouter);
app.use("/api/v1/admin/courses", courseRouter);
app.use("/api/v1/admin/lectures", lectureRouter)


export { app };
