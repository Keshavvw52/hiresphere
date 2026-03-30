import e from "express";
import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { v2 } from "cloudinary";

export const getUserData = async (req, res) => {
  const { userId } = req.auth();

  //console.log("User ID from request:", userId); 

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found in database"); // Log if user is not found
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log("Error fetching user:", error.message); // Log any errors
    res.json({ success: false, message: error.message });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const { userId } = req.auth();

  try {
    const isAlreadyApplied = await JobApplication.findOne({ userId, jobId });

    if (isAlreadyApplied) {
      return res.json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getUserJobApplications = async (req, res) => {
  try {
   const { userId } = req.auth();

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No applications found for this User",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const updateUserResume = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (resumeFile) {
      try {
        const resumeUpload = await v2.uploader.upload(resumeFile.path);
        userData.resume = resumeUpload.secure_url;
      } catch (err) {
        console.log("Cloudinary error:", err.message);

        
        userData.resume = "upload_failed_placeholder";
      }
    }

    await userData.save();

    return res.json({
      success: true,
      message: "Resume Updated Successfully",
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const syncUser = async (req, res) => {
   console.log("SYNC USER API HIT");
  try {
    const { userId } = req.auth();

    
    let user = await User.findById(userId);

    if (!user) {
      
      const { email, name, image } = req.body;

      user = await User.create({
        _id: userId, 
        name,
        email,
        image,
      });

      //console.log("User created in DB");
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};