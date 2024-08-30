import express from "express";
import dbConnection from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

// Load environment variables from .env file
config({ path: "./config/config.env" });

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from frontend URL
    methods: ["GET", "POST", "DELETE", "PUT"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Middleware for parsing cookies, JSON, and URL-encoded data
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Database connection
dbConnection();

// Custom error handling middleware
app.use(errorMiddleware);

// Export the app for server or testing
export default app;
