import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        items: [String],
    },
    { timestamps: true }
);

export const Skill = mongoose.model("Skill", skillSchema);