import express from "express";
import { requireAuth } from "@clerk/express";
import {
  ChangeJobApplicationStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controller/comapanyController.js";

const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", loginCompany);

router.post("/post-job", requireAuth(), postJob);

router.get("/company", requireAuth(), getCompanyData);
router.get("/applicants", requireAuth(), getCompanyJobApplicants);
router.get("/list-jobs", requireAuth(), getCompanyPostedJobs);

router.post("/change-status", requireAuth(), ChangeJobApplicationStatus);
router.post("/change-visibility", requireAuth(), changeVisiblity);

export default router;