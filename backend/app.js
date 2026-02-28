import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userlogin } from "./controllers/user.controller.js";

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
import router from "./routes/CV.routes.js";
import skillRouter from "./routes/skill.route.js";
import projectRouter from "./routes/project.route.js";
import contactRoutes from "./routes/contact.route.js";
import { protect } from "./middleware/protect.js";
app.use(cors(
    {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }

));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/cv", router);
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