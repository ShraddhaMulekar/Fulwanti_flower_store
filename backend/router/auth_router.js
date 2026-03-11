import express from "express";
import { authController } from "../controllers/auth_controller.js";

export const authRouter = express.Router();

authRouter.post("/login", authController);