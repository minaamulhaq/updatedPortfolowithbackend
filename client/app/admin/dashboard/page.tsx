"use client";

import React, { useEffect, useState } from "react";

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


                {/* Content Card */}
                <div className="w-full mx-auto">
                    {activeTab === "skills" && (

                        <>Hi</>

                    )}

                    {activeTab === "CV" && <CvDashboard />}
                </div>
            </div>
        </div>
    );
}