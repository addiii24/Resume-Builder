import dotenv from "dotenv";
import generateInterViewReport from "../Services/ai.service.js";
import interviewReportModel from "../Model/interviewReport.js";

dotenv.config();

export const generateInterViewReportController = async (req, res) => {
    try {
        const {resume,selfDescription,jobDescription} = req.body;
        
      
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:"Failed to generate interview report"});
    }
}