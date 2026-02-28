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
        category: String,
        tech: [String],
        github: String,
        live: String,
    },
    { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);