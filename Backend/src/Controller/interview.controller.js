import dotenv from "dotenv";
import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../Services/ai.service.js"
import interviewReportModel from "../Model/interviewReport.js"
dotenv.config();

export const generateInterViewReportController = async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ success: false, message: "Resume file is required" });
      }

      // Parse the PDF buffer safely using the modern PDFParse class
      const parser = new PDFParse({ data: req.file.buffer });
      const pdfData = await parser.getText();
      const resumeContent = pdfData.text;

      // Make parameter parsing case-insensitive/robust
      const selfDescription = req.body.selfDescription || req.body.SelfDescription;
      const jobDescription = req.body.jobDescription || req.body.JobDescription;

      if (!jobDescription) {
         return res.status(400).json({ success: false, message: "Job description is required" });
      }

      console.log("Extracted parameters:", {
         hasResume: !!resumeContent,
         selfDescription,
         jobDescription
      });

      const interveiwReportByai = await generateInterviewReport({
         resume: resumeContent,
         selfDescription,
         jobDescription
      });

      const userId = req.user?.id || req.user?._id;

      const reportData = {
  ...interveiwReportByai,
  title: interveiwReportByai.title || interveiwReportByai.jobTitle
};

      const interviewReport = await interviewReportModel.create({
         user: userId,
         resume: resumeContent,
         selfDescription,
         jobDescription,
         ...reportData
      });

      res.status(200).json({
         success: true,
         message: "Interview report generated successfully",
         data: interviewReport
      });

   } catch (error) {
      console.error("Error in generateInterViewReportController:", error);
      return res.status(500).json({ success: false, message: `Failed to generate interview report: ${error.message}` });
   }
}