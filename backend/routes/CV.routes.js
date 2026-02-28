import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { createCV, deleteCV, downloadCV, getAllCVs, getCV } from "../controllers/CV.controller.js";
import { protect } from "../middleware/protect.js";

const router = Router();

router.post("/upload",protect, upload.single("cv"), createCV);
router.delete("/delete/:id", protect, deleteCV);
router.get("/download", getCV);
router.get("/all", getAllCVs);
router.get("/download/:id", downloadCV);
export default router;
