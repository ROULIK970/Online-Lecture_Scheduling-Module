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



export { app };
