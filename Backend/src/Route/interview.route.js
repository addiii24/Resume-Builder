import express from "express";
import authUser from "../Middleware/auth.moddleware.js";
import { generateInterViewReportController } from "../Controller/interview.controller.js";
import uploadMiddleware from "../Middleware/file.middleware.js"

const interviewRouter = express.Router()

interviewRouter.post("/",authUser,uploadMiddleware,generateInterViewReportController)

export default interviewRouter