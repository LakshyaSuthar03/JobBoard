import { Router } from "express";
import { createJob, getJobs,getMyJobs,getJob, applyJob, getApplicants, viewResume,getAppliedJobs,employeeResponse } from "../controllers/jobController.js";

const router = Router();
router.post("/", createJob);
router.get("/", getJobs);
router.post("/apply", getJob);
router.post("/applyjob", applyJob);
router.get("/myjobs", getMyJobs);
router.post("/applicants", getApplicants);
router.post("/resume", viewResume);
router.get("/applied", getAppliedJobs);
router.post("/response", employeeResponse);
export default router