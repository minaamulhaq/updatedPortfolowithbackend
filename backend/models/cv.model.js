import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
    {
        fileUrl: {

            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
        assetid: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const CV = mongoose.model("CV", cvSchema);