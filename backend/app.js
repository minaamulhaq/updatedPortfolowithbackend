import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
import router from "./routes/CV.routes.js";
import skillRouter from "./routes/skill.route.js";
import projectRouter from "./routes/project.route.js";
import contactRoutes from "./routes/contact.route.js";
app.use(cors(
    {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
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

export default app;