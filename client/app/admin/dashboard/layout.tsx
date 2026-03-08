"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const getActiveTab = () => {
        if (pathname.includes("skills")) return "skills";
        if (pathname.includes("projects")) return "projects";
        if (pathname.includes("contact")) return "contact";
        if (pathname.includes("CV")) return "CV";
        return "skills"; // default
    };

    const [activeTab, setActiveTab] = useState(getActiveTab());

    const handleTabClick = (tab: string, path: string) => {
        setActiveTab(tab);
        router.push(path);
    };
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
    }, [router]);

    return (
        <div className="min-h-screen bg-[#0f0f14] text-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-10 pt-24 pb-16">
                <h1 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">
                    Admin Dashboard
                </h1>

                {/* Tabs */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <button
                        onClick={() => handleTabClick("skills", "/admin/dashboard/skills")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "skills"
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        Skills
                    </button>

                    <button
                        onClick={() => handleTabClick("projects", "/admin/dashboard/projects")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "projects"
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        Projects
                    </button>

                    <button
                        onClick={() => handleTabClick("contact", "/admin/dashboard/contact")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "contact"
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        Contact
                    </button>

                    {/* <button
                        onClick={() => handleTabClick("CV", "/admin/dashboard/CV")}
                        className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${activeTab === "CV"
                            ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        CV
                    </button> */}
                </div>

                {/* Page content */}
                <div className="w-full mx-auto">

                    {loading && <p>Loading...</p>}
                    {!loading && children}




                </div>
            </div>
        </div>
    );
}