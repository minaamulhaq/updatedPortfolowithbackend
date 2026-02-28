import { Skill } from "../models/skill.model.js";
// create a crud operarion for the schema
export const createSkill = async (req, res) => {
    try {
        // if the request body is empty return an error
        if (!req.body) {
            return res.status(400).json({ error: "Please provide skill data" });
        }
        // if category is not avalable return an error
        if (!req.body.category) {
            return res.status(400).json({ error: "Category is required" });
        }
        const skill = new Skill(req.body);
        const savedSkill = await skill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json({
            success: true,
            data: skills
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
// update skill by id
export const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Skill ID is required" });
        }
        const updatedSkill = await Skill.findByIdAndUpdate(id, req.body);
        if (!updatedSkill) {
            return res.status(404).json({ error: "Skill not found" });
        }
        res.status(200).json({
            success: true,
            data: updatedSkill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}