import { Router } from "express";
import { createSkill, getSkills, updateSkill } from "../controllers/skill.controller.js";
import { protect } from "../middleware/protect.js";

const route = Router();

route.post("/add", protect, createSkill);
route.get("/all", getSkills);
route.put("/update/:id", protect, updateSkill);


export default route;