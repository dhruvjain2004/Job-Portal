import './config/instrument.js';
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhook.js';
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {clerkMiddleware}  from "@clerk/express";

const app = express();

await connectDB();
await connectCloudinary();


app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.send("API Working Properly");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhook',clerkWebhooks);
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
// Fix Sentry error handler usage
app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}`);
});