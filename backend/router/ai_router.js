import express from "express"
import { recommendAiController } from "../controllers/ai_controller/recommend _ai_controller.js"

export const aiRouter = express.Router()

aiRouter.post("/recommend", recommendAiController)