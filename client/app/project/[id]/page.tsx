"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
    ArrowLeft,
    Github,
    ExternalLink,
    Code2,
    Layers,
    Globe,
    ChevronRight,
    Briefcase,
    Send
} from "lucide-react";
import { GlassCard } from "@/component/GlassCard";
import { SectionWrapper } from "@/component/SectionWrapper";
import Link from "next/link";

/* -------------------- Types -------------------- */
interface Images {
    url: string;
    public_id: string;
}

interface Project {
    _id: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    link?: string;
    category: string;
    images: Images[];
    createdAt: string;
}

export default function ProjectDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`);
                setProject(res.data.data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProject();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#0c0c11] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
    );

    if (!project) return null;

    return (
        <main className="min-h-screen  bg-[#0c0c11] text-white pb-20">
            {/* 1. Dynamic Header Section */}
            {/* /* Section ko 'pt-28' (Desktop) aur 'pt-20' (Mobile) diya hai taaki Navbar ki jagah chor de */}
            <section className="relative w-full min-h-[380px] flex items-center overflow-hidden border-b border-white/5 pt-24 md:pt-32 pb-10">

                {/* 1. Cinematic Background Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.images[activeImage]?.url}
                        className="w-full h-full object-cover opacity-50 blur-2xl scale-125"
                        alt="bg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c11] via-[#0c0c11]/60 to-[#0c0c11]" />
                </div>

                {/* 2. Content Layer */}
                <div className="relative z-10 w-full max-w-7xl mx-auto pb-2 px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

                        <div className="max-w-4xl">
                            {/* Title - Reduced size and kept it bold/sleek */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-white drop-shadow-2xl">
                                {project.title}
                            </h1>
                        </div>

                        {/* Actions Cluster */}

                        <div className="flex items-center p-4 gap-4">

                            {project.github && (
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    className="
                                        flex items-center justify-center
                                        h-12 w-12
                                        bg-white/5
                                        border border-white/10
                                        rounded-2xl
                                        text-gray-400
                                        transition-all duration-300
                                        hover:text-white
                                        hover:bg-white/10
                                        hover:border-blue-500/40
                                        hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]
                                        active:scale-95
                                        "
                                    title="Source Code"
                                >
                                    <Github size={20} />
                                </Link>
                            )}

                            {project.link && (
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="
                                        flex items-center gap-2.5
                                        h-12
                                        px-7
                                        bg-blue-600
                                        hover:bg-blue-500
                                        text-white
                                        font-semibold
                                        rounded-2xl
                                        transition-all duration-300
                                        shadow-[0_10px_40px_-10px_rgba(37,99,235,0.5)]
                                        hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                                        active:scale-95
                                        "
                                >
                                    <ExternalLink size={18} />
                                    <span className="text-sm tracking-wide">Link</span>
                                </Link>
                            )}

                        </div>

                    </div>
                </div>
            </section>


            {/* 2. Content Grid */}
            <SectionWrapper className="pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Story & Images */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Gallery */}
                        <div className="space-y-4">
                            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video relative group">
                                <img
                                    src={project.images[activeImage]?.url}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Current Preview"
                                />
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                {project.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative min-w-[120px] h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-500 scale-95' : 'border-transparent opacity-50 hover:opacity-100'}`}
                                    >
                                        <img src={img.url} className="w-full h-full object-cover" alt="thumb" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Description */}
                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-blue-500">01.</span> Project Narrative
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Meta Info Card */}
                    <div className="space-y-6">
                        <GlassCard className="p-8 border-white/10 sticky top-24 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent">
                            <h5 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <Layers className="text-blue-500" size={20} />
                                Project Metadata
                            </h5>

                            <ul className="space-y-4">
                                <li className="flex flex-col gap-2">
                                    <span className="text-gray-500 text-xs uppercase font-bold tracking-widest">Core Technologies</span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-gray-300 border border-white/5 hover:border-blue-500/30 transition-colors">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </li>

                                <li className="flex justify-between items-center border-t border-white/5 pt-4">
                                    <span className="text-gray-500 text-xs uppercase font-bold tracking-widest">Platform</span>
                                    <span className="text-gray-200 font-medium">{project.category}</span>

                                </li>
                                <li className="pt-2 border-t border-white/5">
                                    <button
                                        onClick={() => window.open("https://www.linkedin.com/in/m-inaam-ul-haq/", "_blank")}
                                        className="
                                                w-full
                                                h-12 cursor-pointer
                                                flex items-center justify-center gap-2
                                                bg-white
                                                text-black
                                                font-bold uppercase tracking-widest
                                                rounded-full
                                                shadow-[0_5px_15px_rgba(0,0,0,0.1)]
                                                transition-all duration-500
                                                hover:bg-purple-600
                                                hover:text-white
                                                hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                                                active:scale-95
                                            "
                                    >
                                        <Send size={16} />
                                        Hire Me
                                    </button>
                                </li>
                            </ul>


                        </GlassCard>
                    </div>

                </div>
            </SectionWrapper>
        </main>
    );
}