"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const categories = ["Frontend", "Backend", "AI & Advanced"];

    const [project, setProject] = useState({
        title: "",
        description: "",
        tech: "",
        category: "",
        github: "",
        link: "",
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // ✅ Fetch project by ID
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`
                );

                const data = res.data;

                setProject({
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    tech: data.tech.join(", "),
                    github: data.github || "",
                    link: data.link || "",
                });

            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchProject();
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!project.title || !project.description || !project.category) {
            return alert("Title, Description and Category are required");
        }

        try {
            setLoading(true);

            const payload = {
                title: project.title,
                description: project.description,
                category: project.category,
                tech: project.tech.split(",").map((t) => t.trim()),
                github: project.github,
                link: project.link,
            };

            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/project/update/${id}`,
                payload
            );
            if (res.data.success) {
                toast("Project updated successfully!");
            }
            router.push("/admin/dashboard");
        } catch (error) {
            console.error("Error updating project:", error);

            toast("Update failed");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#0f0f14] text-white flex items-center justify-center">
                Loading project...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f14] text-gray-100 pt-24 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                {/* Card */}
                <div className="bg-[#16161d] border border-white/10 rounded-3xl shadow-xl p-5 sm:p-8 md:p-10">

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
                        Edit Project
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Category */}
                        <div className="md:col-span-2 relative">
                            <select
                                name="category"
                                value={project.category}
                                onChange={handleChange}
                                className="w-full appearance-none bg-[#181820] border border-white/10 text-white px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>

                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                ▼
                            </div>
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
                                rows={5}
                                placeholder="Project Description"
                                className="w-full p-4 rounded-xl bg-[#121218] border border-white/20 focus:outline-none"
                            />
                        </div>

                        {/* GitHub */}
                        <input
                            name="github"
                            value={project.github}
                            onChange={handleChange}
                            placeholder="GitHub Link"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/20 focus:outline-none"
                        />

                        {/* Live Link */}
                        <input
                            name="link"
                            value={project.link}
                            onChange={handleChange}
                            placeholder="Live Demo Link"
                            className="w-full p-4 rounded-xl bg-[#121218] border border-white/20 focus:outline-none"
                        />

                        {/* Update Button */}
                        <div className="md:col-span-2">
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold disabled:opacity-50"
                            >
                                {loading ? "Updating..." : "Update Project"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}