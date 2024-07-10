import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rootRouter from "./routes/index.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json());
app.use("/api/v1", rootRouter);

export default app;
