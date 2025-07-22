import express from "express";
import { getJobs, getJobById } from "../controllers/jobController.js";

const router = express.Router();

// Route to get all jobs (handling query parameters)
router.get('/', getJobs);

// Route to get a job by ID (handling route parameter)
router.get('/:id',
    getJobById);

export default router;