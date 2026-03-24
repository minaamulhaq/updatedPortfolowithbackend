import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userlogin } from "./controllers/user.controller.js";

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

import skillRouter from "./routes/skill.route.js";
import projectRouter from "./routes/project.route.js";
import contactRoutes from "./routes/contact.route.js";
import { protect } from "./middleware/protect.js";
app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }

));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running...");
});


app.use("/api/skill", skillRouter);
app.use("/api/project", projectRouter);
app.use('/api/contact', contactRoutes);

app.post("/api/user/login", userlogin);

app.get("/api/admin/dashboard", protect, (req, res) => {
    res.json({
        success: true,
        message: "Authorized", user: req.user
    });
});

export default app;