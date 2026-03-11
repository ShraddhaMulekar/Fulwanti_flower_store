import express from "express";
import { logInController } from "../controllers/auth_controller/login_controller.js";
import { signInController } from "../controllers/auth_controller/signin_controller.js";

export const authRouter = express.Router();

authRouter.post("/login", logInController);
authRouter.post("/register", signInController);