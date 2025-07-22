import express from "express";
//import { registerCompany , loginCompany } from "../controllers/companyController.js";
import { changeJobApplicationsStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middleware/authMiddleware.js";

const router = express.Router();


//Register a compnay
router.post('/register',upload.single('image'), registerCompany);

//company login
router.post('/login', loginCompany);

//Get company data
router.get('/company', protectCompany, getCompanyData);

//Post a job
router.post('/post-job', protectCompany ,postJob);

//Get Applications data of company
router.get('/applicants', protectCompany ,getCompanyJobApplicants);

//Get Company job list
router.get('/list-jobs', protectCompany ,getCompanyPostedJobs);

//Change Applicaiton status
router.post('/change-status', protectCompany ,changeJobApplicationsStatus);

//Change Applications Visiblity
router.post('/change-visiblity', protectCompany ,changeVisiblity);

export default router;