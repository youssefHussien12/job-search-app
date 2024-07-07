import { Application } from "../../../database/models/application.model.js";
import { Company } from "../../../database/models/company.model.js";
import { Job } from "../../../database/models/job.model.js";
import { AppError } from "../../utils/appError.js";
import { messages } from "../../utils/common/messages.js";


//addjop
const addJob = async (req, res, next) => {
  // get job details
  const {
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
    companyId,
  } = req.body;
  // check if company exists
  const company = await Company.findById(companyId);
  if (!company) {
    return next(new AppError(messages.company.companyNotFound, 400));
  }
  // create job
  const job = new Job({
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
    addedBy: req.user.id,
    company: companyId,
  });
  // save job
  const savedJob = await job.save();
  // send response
  return res.status(201).json({
    message: messages.jop.jopCreated,
    success: true,
    data: savedJob,
  });
};

// Update jop
const updateJop = async (req, res, next) => {
  const { id } = req.params

  // Check if jop exists
  const jop = await Job.findById(id)
  if (!jop) {
    return next(new AppError(messages.jop.jopNotFound, 404));
  }

  // Check if current user is the owner of the jop
  if (String(jop.addedBy) !== String(req.user.id)) {
    return next(new AppError(messages.jop.NotAuthorized, 401));
  }

  // Update jop
  const updatedJop = await Job.findByIdAndUpdate(id, req.body, { new: true });
  // This option ensures the updated document is returned

  // Send response
  return res.status(200).json({
    message: messages.jop.jopUpdated,
    success: true,
    data: updatedJop,
  });
};

// delete jop
const deleteJop = async (req, res, next) => {
  const { id } = req.params

  // Check if jop exists
  const jop = await Job.findById(id)
  if (!jop) {
    return next(new AppError(messages.jop.jopNotFound, 404));
  }

  // Check if current user is the owner of the jop
  if (String(jop.addedBy) !== String(req.user.id)) {
    return next(new AppError(messages.jop.NotAuthorized, 401));
  }

  // Update jop
  const deleteJop = await Job.findByIdAndDelete(id);
  // This option ensures the updated document is returned

  // Send response
  return res.status(200).json({
    message: messages.jop.jopDeleted,
    success: true,
    data: deleteJop,
  });
};



const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find()
  console.log(jobs);
  return res.status(200).json({
    message: "Jobs fetched successfully",
    success: true,
    data: jobs,
  });
};

// Get all Jobs that match filters
const getFilteredJobs = async (req, res, next) => {
  //  get filters
  const { id } = req.params;
  // get jobs
  const jobs = await Job.find({ _id: id }).populate("company").populate("addedBy")
  // send response
  return res.status(200).json({
    message: "Jobs fetched successfully",
    success: true,
    data: jobs,
  });
};

// Get all Jobs for a specific company
const getCompanyJobs = async (req, res, next) => {
  const { companyName } = req.params;
  // check if company exists
  const company = await Company.findOne({ companyName });
  if (!company) {
    return next(new AppError({ message: messages.company.companyNotFound }, 404));
  }
  // get jobs
  const jobs = await Job.find({ company: company._id })
    .populate("company")
    .populate("addedBy");
  return res.status(200).json({
    message: "Jobs fetched successfully",
    success: true,
    data: jobs,
  });
};

// Apply to Job
const applyToJob = async (req, res, next) => {
  // get job details
  const { jobId, userId,userTechSkills,userSoftSkills} = req.body;
  // check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new AppError({ message: messages.jop.jopNotFound }, 404));
  }
  // prepare application  
  const application = new Application({
    jobId,
    userId,
    userTechSkills,
    userSoftSkills,
    appliedAt: new Date(),
  });
  // save application
  const savedApplication = await application.save();
  // send response
  return res.status(201).json({
    message: { message: messages.Application.ApplicationCreated },
    success: true,
    data: savedApplication,
  });
};


export {
  addJob,
  updateJop,
  deleteJop,
  getAllJobs,
  getCompanyJobs,
  getFilteredJobs,
  applyToJob
}