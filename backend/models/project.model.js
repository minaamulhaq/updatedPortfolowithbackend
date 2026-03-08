import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        tech: [String],
        github: {
            type: String,
            default: "",
        },
        live: {
            type: String,
            default: "",
        },
        images: [{
            url: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            },
            assetid: {
                type: String,
                required: true,
            },
        }],
    },
    { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);