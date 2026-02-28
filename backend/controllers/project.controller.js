import { Project } from "../models/project.model.js";
// create a crud operarion for the schema 
export const createProject = async (req, res) => {
    try {
        // if the request body is empty return an error
        if (!req.body) {
            return res.status(400).json({ error: "Please provide project data" });
        }
        // if title adn desccription is not avalable return an error
        if (!req.body.title || !req.body.description) {
            return res.status(400).json({ error: "Title and description are required" });
        }
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getProjects = async (req, res) => {
    try {
        // get number of projects to return from query params
        const limit = parseInt(req.query.limit) || 3;
        const projects = await Project.find().limit(limit);
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Project ID is required" });

        }
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Project ID is required" });
        }
        if (!req.body.title || !req.body.description || !req.body.category) {
            return res.status(400).json({ error: "Title and description are required" });
        }
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}