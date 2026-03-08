"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Cpu, Zap, Terminal } from "lucide-react";
import {
    SiMongodb,
    SiExpress,
    SiReact,
    SiNodedotjs,
    SiNextdotjs,
    SiTailwindcss
} from "react-icons/si";

export default function AboutMe() {
    const techStack = [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "React", icon: <SiReact /> },
        { name: "Node.js", icon: <SiNodedotjs /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
    ];

    return (
        <section className="relative py-24 bg-[#050505] text-white overflow-hidden">
            {/* Ambient Background Elements - Matching Engineering Flow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-350 mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">
                            ABOUT <span className="text-purple-500">ENGINEER.</span>
                        </h2>
                        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                            Philosophy & Technical Stack
                        </p>
                    </div>
                    <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block mb-4" />
                </div>

                {/* Row 1: Philosophy & Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">

                    {/* Philosophy Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-[#0a0a0a] border border-white/5 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden group hover:border-purple-500/40 transition-all duration-500"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-all duration-500">
                                    <Cpu size={20} />
                                </div>
                                <h3 className="text-xl font-bold tracking-tight group-hover:text-purple-400 transition-colors">My Philosophy</h3>
                            </div>

                            <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-8">
                                <span className="text-white font-semibold">Code That Solves Real Problems.</span> I don't just ship features; I build systems. My focus is on creating software that is <span className="text-purple-400">secure, scalable, and intuitive</span>. Whether it's a complex AI integration or a seamless e-commerce platform, I prioritize long-term value over shortcuts.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {["CLEAN_ARCHITECTURE", "USER_CENTRIC", "FUTURE_PROOF"].map((tag) => (
                                    <span key={tag} className="text-[10px] font-mono text-purple-400/60 bg-white/5 border border-white/5 px-3 py-1 rounded-full group-hover:border-purple-500/30 transition-colors">
                                        # {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Column */}
                    <div className="grid grid-rows-2 gap-6">
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center group hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <h3 className="text-5xl font-black bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">1+</h3>
                            <p className="text-gray-400 text-[10px] font-mono mt-2 uppercase tracking-widest">Years Experience</p>
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex items-center gap-5 group hover:border-purple-500/40 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                <Globe size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white uppercase tracking-tight">Global Reach</p>
                                <p className="text-gray-500 text-[10px] font-mono tracking-tighter">REMOTE_READY</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 2: Terminal & Tech Stack */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* Terminal Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden font-mono text-[12px] shadow-2xl flex flex-col h-55 group hover:border-purple-500/40 transition-all duration-500"
                    >
                        <div className="bg-[#0f0f0f] px-4 py-3 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-red-500/50 transition-colors"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-yellow-500/50 transition-colors"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-green-500/50 transition-colors"></div>
                                </div>
                                <span className="text-gray-600 text-[10px] group-hover:text-gray-400 transition-colors">user@portfolio — bash</span>
                            </div>
                        </div>
                        <div className="p-5 space-y-2">
                            <div className="flex gap-2">
                                <span className="text-purple-500">➜</span>
                                <p className="text-gray-300">git commit -m <span className="text-blue-400">"Build scalable systems"</span></p>
                            </div>
                            <div className="flex gap-2 text-gray-500">
                                <span className="text-purple-500">➜</span>
                                <p>push origin main</p>
                            </div>
                            <div className="pt-2 text-[11px] text-gray-600 italic">
                                <p>Enumerating objects: 100% (24/24)</p>
                                <p className="text-purple-500/70 not-italic font-bold">✔ Deploying to production...</p>
                            </div>
                            <div className="flex gap-1 mt-2">
                                <span className="animate-pulse w-2 h-4 bg-purple-500"></span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tech Stack Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col justify-center items-center h-55 group hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden"
                    >
                        {/* Blue Radial Glow */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex items-center gap-2 mb-8 relative z-10">
                            <Zap size={14} className="text-blue-400" />
                            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">Technical Stack</h4>
                        </div>

                        <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap relative z-10">
                            {techStack.map((tech, index) => (
                                <div
                                    key={index}
                                    className="text-2xl md:text-3xl text-gray-600 hover:text-white hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300 cursor-help"
                                >
                                    {tech.icon}
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 text-[9px] font-mono text-gray-600 uppercase tracking-widest relative z-10">
                            MERN & Next.js Ecosystem
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}