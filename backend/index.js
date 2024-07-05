import express from "express";
import dbConnection from "./database/dbConnection.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import jobRouter from "./routes/jobRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/authMiddleware.js"
import upload from "./middleware/uploadResume.js";

dotenv.config();
const app = express();
dbConnection();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth",authRouter);
app.use("/api/job", authMiddleware,upload.single('resume'),jobRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
