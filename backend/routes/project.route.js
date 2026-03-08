import { Router } from "express";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/project.controller.js";
import { protect } from "../middleware/protect.js";
import { upload } from "../middleware/upload.js";

const route = Router();
route.post("/add", protect, upload.array('images', 5), createProject);
route.get("/all", getProjects);
route.get("/:id", getProjectById);
route.delete("/delete/:id", protect, deleteProject);
route.put(
    "/update/:id",
    protect,
    upload.array("images", 10),
    updateProject
);

export default route;