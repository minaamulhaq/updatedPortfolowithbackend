import { Router } from "express";
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from "../controllers/project.controller.js";

const route = Router();
route.post("/add", createProject);
route.get("/all", getProjects);
route.get("/:id", getProjectById);
route.delete("/delete/:id", deleteProject);
route.put("/update/:id", updateProject);

export default route;