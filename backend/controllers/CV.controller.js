import { CV } from "../models/cv.model.js";
import mongoose from "mongoose";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudnary.js";
// create a crud operarion for the schema 
const createCV = async (req, res) => {
    try {
        console.log(req.file);
        // upload the file on cloudinary and get the url of the uploaded file
        const { originalname, path } = req.file;
        const upload = await uploadOnCloudinary(path);
        if (!upload) {
            return res.status(500).json({ message: "Failed to upload CV" });
        }
        // create a new CV document in the database with the url of the uploaded file
        const newCV = new CV({
            fileUrl: upload.secure_url,
            publicId: upload.public_id,
            assetid: upload.asset_id,
        });
        await newCV.save();
        console.log(upload);
        res.status(201).json({ message: "CV created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to create CV", error: error.message });
    }
}
const deleteCV = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("CV ID to delete:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid CV ID",
            });
        }
        // 1️⃣ Find CV
        const cv = await CV.findById(id);
        if (!cv) {
            return res.status(404).json({ message: "CV not found" });
        }
        // delete the file from cloudinary
        const deleted = await deleteFromCloudinary(cv.publicId);
        if (!deleted) {
            return res.status(500).json({ message: "Failed to delete CV from Cloudinary" });
        }
        // delete the CV document from the database
        await CV.findByIdAndDelete(id);
        res.status(200).json({ message: "CV deleted successfully" });
    } catch (error) {
        console.error("Error deleting CV:", error);
        res.status(500).json({ message: "Failed to delete CV", error: error.message });
    }
}

const getCV = async (req, res) => {
    try {
        const cv = await CV.findOne().sort({ createdAt: -1 }); // Get the most recent CV
        if (!cv) {
            return res.status(404).json({
                success: false,
                message: "CV not found"
            });
        }
        res.status(200).json({
            success: true,
            cv: {
                _id: cv._id,
                fileUrl: cv.fileUrl,
                createdAt: cv.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch CV", error: error.message
        });
    }
}

const getAllCVs = async (req, res) => {
    try {
        const cvs = await CV.find().sort({ createdAt: -1 }); // Get all CVs sorted by creation date
        res.status(200).json({
            success: true,
            cvs: cvs.map(cv => ({
                _id: cv._id,
                fileUrl: cv.fileUrl,
                createdAt: cv.createdAt
            }))
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch CVs", error: error.message
        });
    }
}

import { generateDownloadUrl } from "../utils/cloudnary.js";

const downloadCV = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find the CV in database
        const cv = await CV.findById(id);
        if (!cv) {
            return res.status(404).json({ message: "CV not found" });
        }

        // 2. Generate the download URL with the attachment flag
        const downloadUrl = generateDownloadUrl(cv.publicId);

        if (!downloadUrl) {
            return res.status(500).json({ message: "Could not generate download link" });
        }

        // 3. Redirect the browser to this URL
        // This will trigger the "Save File" dialog on the frontend
        res.redirect(downloadUrl);

    } catch (error) {
        console.error("Download error:", error);
        res.status(500).json({ message: "Server error during download", error: error.message });
    }
};
export { createCV, deleteCV, getCV, getAllCVs, downloadCV }