import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userlogin = async (req, res) => {
    try {
        req.body.email = "haqsab786@gmail.com";
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: "Content can not be empty!"
            });
        }
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ success: false, message: "Email and password are required!" });
        }
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const isMatch = await user.matchPassword(req.body.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }
        // genrate token using jwt and set it in cookies
        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in prod
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 60 * 60 * 1000, // 1 hour
        };

        // Set cookie
        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

