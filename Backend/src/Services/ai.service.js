import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
   apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const generateInterviewReport = async () => {
  
}

export default generateInterviewReport;