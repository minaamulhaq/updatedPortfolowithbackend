"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AddProjectPage() {
    const router = useRouter();
    const categories = ["Frontend", "Backend", "AI / Full Stack"];

    // -------------------- State --------------------
    const [project, setProject] = useState({
        title: "",
        description: "",
        tech: "",
        category: "",
        github: "",
        link: "",
    });

    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<{ file: File; previewUrl: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadin, setLoadin] = useState(true);

    // -------------------- Auth Check --------------------
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, { withCredentials: true })
            .catch(() => router.push("/admin/login"))
            .finally(() => setLoadin(false));
    }, [router]);

    // -------------------- Generate Previews --------------------
    useEffect(() => {
        const previews = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));
        setFilePreviews(previews);

        return () => previews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    }, [files]);

    // -------------------- Handlers --------------------
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        // Only allow images
        const images = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));
        setFiles([...files, ...images]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!e.dataTransfer.files) return;

        const images = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith("image/"));
        setFiles([...files, ...images]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleSubmit = async () => {
        if (!project.title || !project.description || !project.category) {
            return toast("Title, Description, and Category are required!");
        }
        if (files.length === 0) return toast("Please upload at least one image!");

        try {
            setLoading(true);


            const formData = new FormData();
            const techArray = project.tech
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "");
                
            formData.append("title", project.title);
            formData.append("description", project.description);
            formData.append("category", project.category);
            formData.append("tech", JSON.stringify(techArray)); // Send as JSON array
            formData.append("github", project.github || "");
            formData.append("link", project.link || "");
            files.forEach((file) => formData.append("images", file));

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/project/add`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast("Project created successfully!");
            router.push("/admin/dashboard/projects");
        } catch (error) {
            console.error(error);
            toast("Failed to create project");
        } finally {
            setLoading(false);
        }
    };

    // -------------------- Loading --------------------
    if (loadin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f0f14] text-white">
                <div className="animate-pulse text-xl">Loading dashboard...</div>
            </div>
        );
    }

    // -------------------- JSX --------------------
    return (
        <div className="min-h-screen bg-[#0f0f14] text-gray-100 pt-24 px-4">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="bg-[#16161d] border border-white/10 rounded-3xl shadow-xl p-5 sm:p-8 md:p-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Add New Project</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Category */}
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-sm text-gray-400 md:hidden">Category</label>
                            <select
                                name="category"
                                value={project.category}
                                onChange={handleChange}
                                className="w-full bg-[#181820] border border-white/10 text-white px-4 py-3 rounded-2xl"
                            >
                                <option value="" className="text-gray-400">Select Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Title */}
                        <input
                            name="title"
                            value={project.title}
                            onChange={handleChange}
                            placeholder="Project Title"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/20 focus:outline-none"
                        />

                        {/* Tech */}
                        <input
                            name="tech"
                            value={project.tech}
                            onChange={handleChange}
                            placeholder="Tech stack (comma separated)"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/20 focus:outline-none"
                        />

                        {/* Description */}
                        <div className="md:col-span-2">
                            <textarea
                                name="description"
                                value={project.description}
                                onChange={handleChange}
                                placeholder="Project Description"
                                rows={5}
                                className="w-full p-4 rounded-xl bg-[#121218] border border-white/20 focus:outline-none"
                            />
                        </div>

                        {/* GitHub */}
                        <input
                            name="github"
                            value={project.github}
                            onChange={handleChange}
                            placeholder="GitHub Link (optional)"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/20 focus:outline-none"
                        />

                        {/* Live Link */}
                        <input
                            name="link"
                            value={project.link}
                            onChange={handleChange}
                            placeholder="Live Demo Link (optional)"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/20 focus:outline-none"
                        />

                        {/* Drag & Drop Upload */}
                        <div
                            className="md:col-span-2 border-2 border-dashed border-white/20 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-gray-400 cursor-pointer hover:border-purple-500 transition"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById("fileInput")?.click()}
                        >
                            <p>Drag & Drop images here or click to select</p>
                            <p className="text-sm text-gray-500">Only images are allowed</p>
                            <Plus size={24} />
                            <input
                                type="file"
                                id="fileInput"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Preview */}
                        {filePreviews.length > 0 && (
                            <div className="md:col-span-2 flex flex-wrap gap-2 mt-2">
                                {filePreviews.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="w-28 h-28 bg-white/5 flex flex-col items-center justify-center rounded-lg text-xs text-gray-400 relative overflow-hidden"
                                    >
                                        <img
                                            src={item.previewUrl}
                                            alt={item.file.name}
                                            className="object-cover w-full h-full"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                                            className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs shadow-lg hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold disabled:opacity-50"
                            >
                                {loading ? "Creating..." : "Create Project"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}