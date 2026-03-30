import express from "express";
import { requireAuth } from "@clerk/express";

import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
  syncUser,
} from "../controller/userController.js";

import upload from "../config/multer.js";

const router = express.Router();


router.get("/user", getUserData);


router.post("/apply", applyForJob);


router.get("/applications", getUserJobApplications);


router.post("/update-resume", upload.single("resume"), updateUserResume);


router.post("/sync-user", requireAuth(), syncUser);

export default router;