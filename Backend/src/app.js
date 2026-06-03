import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./Route/user.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", router);

export default app;