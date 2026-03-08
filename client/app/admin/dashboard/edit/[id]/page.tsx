"use client";

import React, { useEffect, useState, ChangeEvent, DragEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";

// --- Interfaces ---
interface ProjectImage {
    url: string;
    public_id: string;
}

interface FilePreview {
    file: File | null;
    previewUrl: string;
    public_id?: string;
}

interface ProjectData {
    title: string;
    description: string;
    tech: string;
    category: string;
    github: string;
    live: string;
}

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const categories = ["Frontend", "Backend", "AI / Full Stack"];

    // --- State ---
    const [project, setProject] = useState<ProjectData>({
        title: "",
        description: "",
        tech: "",
        category: "",
        github: "",
        live: "",
    });

    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
    const [removedImages, setRemovedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // -------------------- Fetch project by ID --------------------
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`);
                const data = res.data.data;

                setProject({
                    title: data.title || "",
                    description: data.description || "",
                    category: data.category || "",
                    tech: Array.isArray(data.tech) ? data.tech.join(", ") : "",
                    github: data.github || "",
                    live: data.live || "",
                });


                const previews: FilePreview[] = (data.images || []).map((img: ProjectImage) => ({
                    file: null,
                    previewUrl: img.url,
                    public_id: img.public_id,
                }));

                setFilePreviews(previews);
            } catch (error: any) {
                console.error("Error fetching project:", error);
                toast.error("Failed to fetch project data");
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchProject();
    }, [id]);

    // -------------------- Generate new file previews --------------------
    useEffect(() => {
        const newPreviews = files.map((file) => ({
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        // Keep existing DB images (file is null) and add current local files
        setFilePreviews((prev) => [
            ...prev.filter((p) => p.file === null),
            ...newPreviews,
        ]);

        // Cleanup URLs to avoid memory leaks
        return () => newPreviews.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    }, [files]);

    // -------------------- Handlers --------------------
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const images = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
        setFiles((prev) => [...prev, ...images]);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!e.dataTransfer.files) return;
        const images = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
        setFiles((prev) => [...prev, ...images]);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleRemovePreview = (index: number) => {
        const previewToRemove = filePreviews[index];

        // If it's an existing image from DB, track its ID for backend deletion
        if (!previewToRemove.file && previewToRemove.public_id) {
            setRemovedImages((prev) => [...prev, previewToRemove.public_id as string]);
        }

        // If it's a new file, remove it from the files state
        if (previewToRemove.file) {
            setFiles((prev) => prev.filter((f) => f !== previewToRemove.file));
        }

        // Remove from the preview list
        setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    // -------------------- Update Project --------------------
    const handleUpdate = async () => {
        if (!project.title || !project.description || !project.category) {
            return toast.error("Title, Description, and Category are required!");
        }

        try {
            setLoading(true);
            const formData = new FormData();

            // Clean tech stack
            const techArray = project.tech
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item !== "");

            formData.append("title", project.title);
            formData.append("description", project.description);
            formData.append("category", project.category);
            formData.append("tech", JSON.stringify(techArray));
            formData.append("github", project.github || "");
            formData.append("live", project.live || "");

            // Send the list of Public IDs to delete from Cloudinary
            if (removedImages.length > 0) {
                formData.append("removeImages", JSON.stringify(removedImages));
            }
            console.log("FormData entries:");
            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            // Append new image files
            files.forEach((file) => {
                formData.append("images", file);
            });

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/project/update/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            toast.success("Project updated successfully!");
            router.push("/admin/dashboard/projects");
        } catch (error: any) {
            console.error("Update failed:", error);
            toast.error(error.response?.data?.message || "Failed to update project");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#0f0f14] text-white flex items-center justify-center">
                <div className="animate-pulse text-lg">Loading project details...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f14] text-gray-100  px-4 pb-12">
            <div className="max-w-6xl mx-auto">

                <div className="bg-[#16161d] border border-white/10 rounded-3xl shadow-xl p-5 sm:p-8 md:p-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">Edit Project</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Category */}
                        <div className="md:col-span-2">
                            <select
                                name="category"
                                value={project.category}
                                onChange={handleChange}
                                className="w-full cursor-pointer bg-[#181820] border border-white/10 text-white px-4 py-3 rounded-2xl focus:border-purple-500 outline-none transition"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Title */}
                        <input
                            name="title"
                            value={project.title}
                            onChange={handleChange}
                            placeholder="Project Title"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/10 focus:border-purple-500 outline-none transition"
                        />

                        {/* Tech */}
                        <input
                            name="tech"
                            value={project.tech}
                            onChange={handleChange}
                            placeholder="Tech stack (comma separated)"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/10 focus:border-purple-500 outline-none transition"
                        />

                        {/* Description */}
                        <div className="md:col-span-2">
                            <textarea
                                name="description"
                                value={project.description}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Project Description"
                                className="w-full p-4 rounded-xl bg-[#121218] border border-white/10 focus:border-purple-500 outline-none transition"
                            />
                        </div>

                        {/* GitHub */}
                        <input
                            name="github"
                            value={project.github}
                            onChange={handleChange}
                            placeholder="GitHub Link"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/10 focus:border-purple-500 outline-none transition"
                        />

                        {/* Live Link */}
                        <input
                            name="live"
                            value={project.live}
                            onChange={handleChange}
                            placeholder="Live Demo Link"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/10 focus:border-purple-500 outline-none transition"
                        />

                        {/* Drag & Drop Upload */}
                        <div
                            className="md:col-span-2 border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 text-gray-400 cursor-pointer hover:border-purple-500 hover:bg-white/5 transition"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onClick={() => document.getElementById("fileInput")?.click()}
                        >
                            <Plus size={32} className="text-purple-500" />
                            <p className="font-medium text-center">Drag & Drop images here or click to select</p>
                            <input
                                type="file"
                                id="fileInput"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Preview Grid */}
                        {filePreviews.length > 0 && (
                            <div className="md:col-span-2 flex flex-wrap gap-4 mt-2">
                                {filePreviews.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="w-24 h-24 sm:w-32 sm:h-32 bg-white/5 border border-white/10 rounded-xl relative group overflow-hidden"
                                    >
                                        <img
                                            src={item.previewUrl}
                                            alt="Project preview"
                                            className="object-cover w-full h-full transition group-hover:scale-105"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemovePreview(idx);
                                            }}
                                            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Update Button */}
                        <div className="md:col-span-2 mt-4">
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="w-full cursor-pointer py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
                            >
                                {loading ? "Saving Changes..." : "Update Project"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}