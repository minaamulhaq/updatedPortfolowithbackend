import { Router } from "express";
import { createSkill, getSkills, updateSkill } from "../controllers/skill.controller.js";

const route = Router();

route.post("/add", createSkill);
route.get("/all", getSkills);
route.put("/update/:id", updateSkill);


export default route;