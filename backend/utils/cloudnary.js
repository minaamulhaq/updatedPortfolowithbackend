import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        console.log("Secret key :", process.env.CLOUDINARY_API_SECRET);
        if (!localFilePath) return null;

        // Upload file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "raw",
            folder: "portfolio", // optional but recommended
        });

        console.log("✅ File uploaded on Cloudinary:", response.secure_url);

        // Delete local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return response;
    } catch (error) {
        console.error("❌ Cloudinary upload failed:", error);

        // Delete file if exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};
const deleteFromCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("✅ File deleted from Cloudinary:", response);
        return response;
    } catch (error) {
        console.error("❌ Cloudinary deletion failed:", error);
        return null;
    }
}


const generateDownloadUrl = (publicId) => {
    try {
        return cloudinary.url(publicId, {
            flags: "attachment",
            resource_type: "raw", // Must match the upload type
        });
    } catch (error) {
        console.error("Error generating download URL:", error);
        return null;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary, generateDownloadUrl };