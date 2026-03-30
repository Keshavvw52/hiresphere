import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import "./config/instrument.js";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import { clerkMiddleware } from "@clerk/express";
import * as Sentry from "@sentry/node";

import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import JobRoutes from "./routes/jobRoutes.js";
import { clerkWebhooks } from "./controller/webhooks.js";

const app = express();

// Connect DB
console.log("ENV CHECK:", process.env.MONGO_URI);
await connectDB();
await connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Clerk FIRST
app.use(clerkMiddleware());

// ✅ Routes AFTER
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", JobRoutes);

// Basic route
app.get("/", (req, res) => res.send("API Working"));

// Sentry
Sentry.setupExpressErrorHandler(app);

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

// Webhooks
app.post("/webhooks", clerkWebhooks);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));