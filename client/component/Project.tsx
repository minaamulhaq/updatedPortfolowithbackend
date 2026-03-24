"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { SectionWrapper } from "./SectionWrapper";
import { GlassCard } from "./GlassCard";
import { ExternalLink, Github, ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import Skeleton from "./Skeleton";

/* -------------------- Types -------------------- */
interface Images {
    url: string;
    public_id: string;
    assetid: string;
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
}

/* -------------------- Compact Slider (Fits Landscape) -------------------- */
const ProjectImageSlider = ({ images }: { images: Images[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images?.length) return <div className="w-full h-full bg-white/5 animate-pulse" />;

    return (
        <div className="relative group w-full h-full overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, i) => (
                    <img key={i} src={img.url} alt="Work" className="w-full h-full object-cover flex-shrink-0" />
                ))}
            </div>

            {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={(e) => { e.preventDefault(); setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1); }}
                        className="p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-blue-500 transition-all"
                    >
                        <ChevronLeft size={12} />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1); }}
                        className="p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-blue-500 transition-all"
                    >
                        <ChevronRight size={12} />
                    </button>
                </div>
            )}
        </div>
    );
};

/* -------------------- Main Component -------------------- */
export default function Project() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/all`);
                setProjects(res.data.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <SectionWrapper id="projects" className="py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Minimal Header */}
                <div className="mb-12">
                    <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                        Featured Works
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        [1, 2, 3].map(i => (
                            <div key={i} className="h-[280px] rounded-[2.5rem] bg-[#0c0c11]/80 border border-white/10 p-0 overflow-hidden flex flex-col">
                                <Skeleton className="h-[70%] w-full rounded-none" />
                                <div className="p-4 px-5 flex-1 flex flex-col justify-center gap-2">
                                    <Skeleton className="h-3 w-12" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-3 w-10" />
                                        <Skeleton className="h-3 w-10" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        projects.map((proj) => (
                            <div key={proj._id} className="group relative">

                                {/* 1. The Glow (Focused & Neon-like) */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/60 to-purple-600/60 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 ease-out" />

                                {/* 2. The Card (Ultra-Compact height: 280px) */}
                                <GlassCard className="relative flex flex-col h-[280px] overflow-hidden border-white/10 group-hover:border-white/20 transition-all duration-500 p-0 rounded-[2.5rem] bg-[#0c0c11]/80">

                                    {/* Top: 70% Image Slider (Fixed Ratio) */}
                                    <div className="h-[70%] w-full relative overflow-hidden border-b border-white/5">
                                        <ProjectImageSlider images={proj.images} />
                                    </div>

                                    {/* Bottom: 30% Content (Packed density) */}
                                    <div className="flex-1 p-4 px-5 flex items-center justify-between gap-4">

                                        <div className="flex-1 min-w-0">
                                            {/* Category + Title Packed */}
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[9px] font-bold tracking-tight uppercase text-blue-400">
                                                    {proj.category || "Web"}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-tight truncate">
                                                {proj.title}
                                            </h4>

                                            {/* Condensed Tech #tags */}
                                            <div className="flex flex-wrap gap-x-2.5 gap-y-1 mt-1.5">
                                                {proj.tech.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="text-[10px] text-gray-500 font-medium">
                                                        #{t.toLowerCase()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions (Side-by-side) */}
                                        <div className="flex flex-col gap-2.5 items-center justify-center pt-2.5">
                                            <div className="flex gap-3 text-gray-500">
                                                {proj.github && <a href={proj.github} target="_blank" className="hover:text-white transition-colors" aria-label="Github"><Github size={15} /></a>}
                                                {proj.link && <a href={proj.link} target="_blank" className="hover:text-white transition-colors" aria-label="Demo"><ExternalLink size={15} /></a>}
                                            </div>
                                            <a
                                                href={`/project/${proj._id}`}
                                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                                            >
                                                <MoveRight size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </SectionWrapper>
    );
}