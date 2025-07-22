import Job from "../models/Job.js";

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });
    res.json({ success: true, jobs });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get a single job by id
export const getJobById = async (req, res) => {
  try {
    const id = req.params.id;  // Correct way to access id
    
    const job = await Job.findById(id).populate({
      path: 'companyId',
      select: '-password',
    });

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    res.json({
      success: true,
      job,  // Include the job in the response
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};