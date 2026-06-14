import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
   apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(10).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(5).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).min(5).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).min(3).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).min(7).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
  try {
   const prompt = `
You are an expert Technical Recruiter, Resume Analyzer, and Interview Coach.

Analyze the candidate's resume, self-description, and job description.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

Generate a detailed interview report.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT return markdown.
3. Do NOT use code blocks.
4. Do NOT use snake_case field names.
5. Use EXACT field names specified below.
6. Every field is mandatory.
7. Do NOT return empty arrays.
8. Generate realistic and detailed content.
9. Match the response structure exactly.

Required JSON Structure:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": [string]
    }
  ],
  "title": string
}

Additional Requirements:

- Generate exactly 10 technical questions.
- Generate exactly 5 behavioral questions.
- Generate at least 5 skill gaps.
- Generate a 7-day preparation plan.
- Match score must be between 0 and 100.
- Skill gap severity must only be:
  "low", "medium", or "high".
- Every preparation day must contain at least 3 tasks.
- Questions should be tailored specifically to the candidate profile and job description.

IMPORTANT:

technicalQuestions must be an array of objects:

[
  {
    "question": "string",
    "intention": "string",
    "answer": "string"
  }
]

behavioralQuestions must be an array of objects:

[
  {
    "question": "string",
    "intention": "string",
    "answer": "string"
  }
]

skillGaps must be:

[
  {
    "skill": "string",
    "severity": "low"
  }
]

preparationPlan must be:

[
  {
    "day": 1,
    "focus": "React Fundamentals",
    "tasks": [
      "Task 1",
      "Task 2"
    ]
  }
]

Return ONLY JSON.
`;
       
   const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: prompt,
  config: {
    responseFormat: {
       text: {
       mimeType: "application/json", 
      schema: zodToJsonSchema(interviewReportSchema) } },
  },
});

    if (!response || !response.text) {
      throw new Error("No response text returned from the AI model.");
    }

    const result = interviewReportSchema.parse(
  JSON.parse(response.text)
);
    return result;
  } catch (error) {
    console.error("Error generating report in AI service:", error);
    throw new Error(`AI Service error: ${error.message}`);
  }
}

export default generateInterviewReport;