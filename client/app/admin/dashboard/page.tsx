"use client";

import React, { useEffect, useState } from "react";
import SkillsDashboard from "@/component/SkillsDashboard";
import ProjectDashboard from "@/component/ProjectDashboard";
import ContactDashboard from "@/component/ContactDashboard";
import CvDashboard from "@/component/CvDashboard";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"skills" | "projects" | "contact" | "CV">("skills");

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, {
                withCredentials: true,
            })
            .catch(() => {
                router.push("/admin/login");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f0f14] text-white">
                <div className="animate-pulse text-xl">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f14] text-gray-100">
            {/* Wrapper for content with spacing from header */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 pt-24 pb-16">
                {/* Page Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">
                    Admin Dashboard
                </h1>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <button
                        onClick={() => setActiveTab("skills")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "skills"
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        Skills
                    </button>

                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "projects"
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        Projects
                    </button>

                    <button
                        onClick={() => setActiveTab("contact")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "contact"
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        Contact
                    </button>

                    <button
                        onClick={() => setActiveTab("CV")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "CV"
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        CV
                    </button>
                </div>

                {/* Content Card */}
                <div className="w-full mx-auto">
                    {activeTab === "skills" && (

                        <SkillsDashboard />

                    )}
                    {activeTab === "projects" && <ProjectDashboard />}
                    {activeTab === "contact" && <ContactDashboard />}
                    {activeTab === "CV" && <CvDashboard />}
                </div>
            </div>
        </div>
    );
}