import jobModel from "../database/models/jobModel.js";
import userModel from "../database/models/userModel.js";
import applicationModel from "../database/models/applicationModel.js";
import fs from "fs"
import { dirname } from 'path';
import path from "path"
import { fileURLToPath } from 'url';
const createJob = async (req, res) => {
  const { title, description, location, salary } = req.body;
  const employerId = req.user._id;
  if (!title || !description || !location || !salary) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newJob = new jobModel({
      title,
      description,
      location,
      salary,
      employer: employerId,
    });
    // job created
    const savedJob = await newJob.save();
    // updating employer's job array
    await userModel.findByIdAndUpdate(employerId, {
      $push: { jobsPosted: savedJob._id },
    });

    return res.status(201).json(savedJob);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find().populate("employer", "username");
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getJob = async (req, res) => {
  if (req.body.id) {
    try {
      const job = await jobModel
        .findById(req.body.id)
        .populate("employer", "username");
      return res.status(200).json(job);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
const getMyJobs = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ message: "User not found" });
  }
  try {
    const myJobs = await jobModel
      .find({ employer: userId })
      .populate("employer", "username email");
    return res.status(200).json(myJobs);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const applyJob = async (req, res) => {

  const { id } = req.body;
  const resumePath = req.file.path;

  if (!id) {
    return res.status(400).json({ message: "Job not found" });
  }
  try {
    const job = await jobModel.findById(id);
    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }
    const application = new applicationModel({
      job: job._id,
      employee: req.user._id,
      resume: resumePath,
    });
    await application.save();
    job.applications.push(application._id);
    await job.save();
    res.status(200).json({ message: "Applied Successfully" });
    
  } catch (error) {
    console.log(error);
  }
}
const getApplicants = async (req, res) => {
  const { id } = req.body
  if(!id){
    return res.status(400).json({message:"Job not found"})
  }
  try {
    const applicants = await applicationModel.find({job:id}).populate("employee","username email")
    res.status(200).json(applicants)
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
}
const viewResume = (req, res) => {
  try {
    const { resumePath } = req.body
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(__dirname, '..', resumePath);
  fs.readFile(filePath, (err, data) => {
    res.status(200).contentType("application/pdf").send(data)
  })
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
  
}

const getAppliedJobs = async (req, res) => {
  const id = req.user._id
  if (!id) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  try {
    const appliedJobs = await applicationModel.find({ employee: id }).populate("job", "title location")
    res.status(200).json(appliedJobs)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const employeeResponse = async (req, res) => {
  const { response, id } = req.body;
try {
  const jobStatus = await applicationModel.find({ job: id }).updateOne({ $set: { status: response } });
  res.status(200).json(jobStatus);
} catch (error) {
  res.status(500).json({ message: "Internal Server Error" });
}

};
 
export { createJob, getJobs, getMyJobs, getJob,applyJob,getApplicants,viewResume,getAppliedJobs,employeeResponse};
