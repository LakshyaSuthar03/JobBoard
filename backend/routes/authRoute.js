import { login, logout, register } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";
const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
