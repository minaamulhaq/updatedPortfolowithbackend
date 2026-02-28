"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/* -------------------- Types -------------------- */

interface Project {
    _id: string;
    title: string;
    description: string;
    tech: string[];
    github?: string;
    link?: string;
}

/* -------------------- Main Component -------------------- */

export default function ProjectDashboard() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    /* -------------------- Fetch Projects -------------------- */
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/all?limit=1000`);
                setProjects(res.data || []);
                console.log("Fetched projects:", res.data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    /* -------------------- Handlers -------------------- */

    const handleDeleteProject = async (id: string) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/project/delete/${id}`);
            setProjects((prev) => prev.filter((p) => p._id !== id));
            toast("Project deleted successfully!");
        } catch (err) {

            toast("Failed to delete project");
        }
    };

    const handleEditProject = (id: string) => {
        router.push(`/admin/dashboard/edit/${id}`);
    };

    const handleAddProject = () => {
        router.push("/admin/dashboard/add");
    };

    return (
        <div className="bg-[#16161d] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl w-full transition-all duration-300">
            {/* Header with Add Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Projects</h2>
                <button
                    onClick={handleAddProject}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded-xl font-bold hover:bg-purple-600 transition text-white"
                >
                    <Plus size={16} /> Add New Project
                </button>
            </div>

            {/* Project List */}
            <div className="flex flex-col gap-4 max-h-125 overflow-y-auto">
                {loading ? (
                    <p className="text-gray-400">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p className="text-gray-400">No projects found.</p>
                ) : (
                    projects.map((proj) => (
                        <div
                            key={proj._id}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{proj.title}</h3>
                                <p className="text-gray-400 text-sm">{proj.description}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {proj.tech.map((t, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-purple-600/20 px-2 py-1 rounded-full text-purple-400"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 mt-2 md:mt-0">
                                <button
                                    onClick={() => handleEditProject(proj._id)}
                                    className="px-3 py-1 bg-blue-500 rounded-lg text-white text-sm flex items-center gap-1 hover:bg-blue-600 transition"
                                >
                                    <Edit size={16} /> Edit
                                </button>

                                <button
                                    onClick={() => handleDeleteProject(proj._id)}
                                    className="px-3 py-1 bg-red-500 rounded-lg text-white text-sm flex items-center gap-1 hover:bg-red-600 transition"
                                >
                                    <X size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}