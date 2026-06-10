import express from "express";
import authUser from "../Middleware/auth.moddleware.js";
import { generateInterViewReportController } from "../Controller/interview.controller.js";

const interviewRouter = express.Router()

interviewRouter.post("/",authUser,generateInterViewReportController)

export default interviewRouter;