import { Project } from "../models/project.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudnary.js";
import mongoose from "mongoose";
// create a crud operarion for the schema 
export const createProject = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        // if the request body is empty return an error
        if (!req.body) {
            return res.status(400).json({ error: "Please provide project data" });
        }
        // if title adn desccription is not avalable return an error
        if (!req.body.title || !req.body.description) {
            return res.status(400).json({ error: "Title and description are required" });
        }
        if (!req.body.category) {
            return res.status(400).json({ error: "Category is required" });
        }
        req.body.tech = req.body.tech ? (typeof req.body.tech === "string" ? JSON.parse(req.body.tech) : req.body.tech) : [];
        if (!req.body.tech || !Array.isArray(req.body.tech)) {
            return res.status(400).json({ error: "Tech stack must be an array of strings" });
        }
        const uploadedImages = await Promise.all(
            files.map((file) => uploadOnCloudinary(file.path))
        );

        console.log("Uploaded images:", uploadedImages);
        const imageData = uploadedImages.map((file) => ({
            url: file.secure_url,
            public_id: file.public_id,
            assetid: file.asset_id,
        }));

        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            tech: req.body.tech,
            images: imageData
        });

        // const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getProjects = async (req, res) => {
    try {

        const limit = parseInt(req.query.limit) || 3;

        const projects = await Project
            .find({})
            .sort({ createdAt: -1 }) // newest first
            .limit(limit)
            .select("title description category tech images github live");

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects"
        });
    }
};



export const getProjectById = async (req, res) => {
    try {

        const { id } = req.params;

        // validate mongodb id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID"
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch project"
        });
    }
};




export const deleteProject = async (req, res) => {
    try {

        const { id } = req.params;

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID"
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }


        // Delete images from Cloudinary
        await Promise.all(
            project.images.map(img => deleteFromCloudinary(img.public_id))
        );

        // Delete project from DB
        await Project.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete project"
        });
    }
};

export const updateProject = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID"
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const { title, description, category, tech, removeImages, github, live } = req.body;

        // update basic fields
        if (title) project.title = title;
        if (description) project.description = description;
        if (category) project.category = category;
        if (github) project.github = github;
        if (live) project.live = live;
        if (tech) {
            project.tech = typeof tech === "string" ? JSON.parse(tech) : tech;
        }

        // remove selected images
        if (removeImages) {
            const imagesToRemove = typeof removeImages === "string"
                ? JSON.parse(removeImages)
                : removeImages;

            for (const public_id of imagesToRemove) {
                await deleteFromCloudinary(public_id);
            }

            project.images = project.images.filter(
                (img) => !imagesToRemove.includes(img.public_id)
            );
        }

        // upload new images
        if (req.files && req.files.length > 0) {

            const uploadedImages = await Promise.all(
                req.files.map(file => uploadOnCloudinary(file.path))
            );

            const newImages = uploadedImages.map(img => ({
                url: img.secure_url,
                public_id: img.public_id,
                assetid: img.asset_id
            }));

            project.images.push(...newImages);
        }

        const updatedProject = await project.save();

        res.status(200).json({
            success: true,
            data: updatedProject
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update project"
        });

    }
};