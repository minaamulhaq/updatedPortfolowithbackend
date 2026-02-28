"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AddProjectPage() {
    const router = useRouter();

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

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
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

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/project/add`,
                payload,
                { withCredentials: true }
            );
            if (res.data.success) {
                console.log("Project created:", res.data);
                toast("Project created successfully!");
                router.push("/admin/dashboard");
            }
        } catch (error) {
            console.error(error);
            toast("Failed to create project");
        } finally {
            setLoading(false);
        }
    };

    const [loadin, setLoadin] = useState(true);
    useEffect(() => {
        setLoadin(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, {
                withCredentials: true,
            })
            .catch(() => {
                router.push("/admin/login");
            })
            .finally(() => {
                setLoadin(false);
            });
    }, []);

    if (loadin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f0f14] text-white">
                <div className="animate-pulse text-xl">Loading dashboard...</div>
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
                        Add New Project
                    </h1>

                    {/* Responsive Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Category */}
                        {/* Category */}
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-sm text-gray-400 md:hidden">
                                Category
                            </label>

                            <div className="relative">
                                <select
                                    name="category"
                                    value={project.category}
                                    onChange={handleChange}
                                    className="
        w-full
        appearance-none
        bg-[#181820]
        border border-white/10
        text-white
        px-4 py-3
        rounded-2xl
        text-base
        focus:outline-none
        focus:ring-2
        focus:ring-purple-500/40
        focus:border-purple-500
        transition-all
      "
                                >
                                    <option value="" className="text-gray-400">
                                        Select Category
                                    </option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>

                                {/* Custom Arrow */}
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
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

                        {/* Description full width */}
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

                        {/* Button Full Width */}
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