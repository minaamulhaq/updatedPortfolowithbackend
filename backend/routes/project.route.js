import { Router } from "express";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/project.controller.js";
import { protect } from "../middleware/protect.js";

const route = Router();
route.post("/add", protect, createProject);
route.get("/all", getProjects);
route.get("/:id", getProjectById);
route.delete("/delete/:id",protect, deleteProject);
route.put("/update/:id", protect, updateProject);

export default route;