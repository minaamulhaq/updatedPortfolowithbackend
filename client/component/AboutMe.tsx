"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Code2 } from "lucide-react";
import { Code, Database, Server, Layers, Terminal, Package } from "lucide-react";
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
        { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
        { name: "Express", icon: <SiExpress className="text-white" /> },
        { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
        { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    ];

    return (
        <section className="py-16 md:py-28 px-5 md:px-12 max-w-7xl mx-auto bg-[#0f0f14] text-gray-100 font-sans">

            {/* Section Header */}
            <div className="text-center mb-12">
                <h3 className="text-blue-400 font-mono text-sm mb-2 uppercase tracking-widest">// about_me</h3>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">The Engineer Behind the Code</h2>
            </div>

            {/* Row 1: Philosophy & Stats */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 items-stretch">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="bg-[#16161d]/50 border border-white/5 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-center shadow-xl"
                >
                    <h2 className="text-2xl font-bold text-blue-400 mb-4 uppercase tracking-tighter">My Philosophy</h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        <strong>Code That Solves Real Problems.</strong> I don't just ship features; I build systems.
                        My focus is on creating software that is <strong>secure, scalable, and intuitive</strong>.
                        Whether it's a complex AI integration or a seamless e-commerce platform, I prioritize long-term value over shortcuts.
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-purple-400/80">
                        <span className="bg-purple-500/10 px-2 py-1 rounded"># CLEAN_ARCHITECTURE</span>
                        <span className="bg-purple-500/10 px-2 py-1 rounded"># USER_CENTRIC</span>
                        <span className="bg-purple-500/10 px-2 py-1 rounded"># FUTURE_PROOF</span>
                    </div>
                </motion.div>

                <div className="flex flex-col gap-4">
                    <div className="bg-[#16161d]/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center flex-1 hover:bg-white/5 transition-all">
                        <h3 className="text-5xl font-extrabold text-purple-500 mb-1">3+</h3>
                        <p className="text-gray-300 font-medium">Years Experience</p>
                        <p className="text-gray-500 text-xs mt-1 text-center">Delivering scalable web & AI solutions worldwide</p>
                    </div>
                    <div className="bg-[#16161d]/50 border border-white/10 rounded-2xl p-6 flex items-center justify-center gap-6 flex-1 hover:bg-white/5 transition-all">
                        <Globe className="text-blue-400 w-10 h-10 shrink-0" />
                        <div>
                            <p className="text-gray-300 font-semibold text-lg">Global Reach</p>
                            <p className="text-gray-500 text-sm">Serving clients worldwide, remote-ready</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Terminal & Tech Stack (Equal Height) */}
            <div className="grid md:grid-cols-2 gap-8 items-stretch">

                {/* Terminal Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-[#050505] border border-white/10 rounded-xl overflow-hidden font-mono text-[13px] shadow-2xl flex flex-col h-full"
                >
                    <div className="bg-[#1c1c21] px-4 py-2.5 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-gray-500 text-[11px] font-sans">user@portfolio.com — git-bash</span>
                        </div>
                    </div>
                    <div className="p-6 space-y-1.5 flex-grow">
                        <div className="flex gap-2">
                            <span className="text-green-400">➜</span>
                            <span className="text-blue-400">~</span>
                            <p className="text-white">git commit -m <span className="text-yellow-200">"Delivering excellence"</span></p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-green-400">➜</span>
                            <span className="text-blue-400">~</span>
                            <p className="text-white">git push origin master</p>
                        </div>
                        <p className="text-gray-400 mt-2">Enumerating objects: 100% (25/25), done.</p>
                        <p className="text-gray-400">Delta compression using up to 8 threads</p>
                        <p className="text-blue-300 font-semibold">Remote: Deploying to production... Success! 🚀</p>
                        <div className="flex gap-1 mt-3">
                            <span className="animate-pulse w-2 h-4 bg-blue-500"></span>
                        </div>
                    </div>
                </motion.div>

                {/* Single Line Tech Stack Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="bg-[#16161d]/50 border border-white/10 rounded-2xl p-8 flex flex-col justify-center h-full shadow-lg"
                >
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 mb-6">
                        <Code2 className="text-purple-500 w-6 h-6" />
                        <h4 className="text-lg font-bold uppercase tracking-widest text-white text-center">Tech Stack</h4>
                    </div>

                    {/* Neutral Icons Row */}
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        {[
                            { name: "Frontend", icon: <Code /> },
                            { name: "Backend", icon: <Server /> },
                            { name: "Database", icon: <Database /> },
                            { name: "API", icon: <Layers /> },
                            { name: "Dev Tools", icon: <Terminal /> },
                            { name: "Package", icon: <Package /> },
                        ].map((tech, index) => (
                            <div
                                key={index}
                                title={tech.name}
                                className="flex items-center justify-center text-white text-3xl md:text-4xl cursor-pointer hover:scale-110 transition-transform duration-300"
                            >
                                {tech.icon}
                            </div>
                        ))}
                    </div>

                    {/* Footer Text */}
                    <p className="text-center text-gray-500 text-[10px] mt-4 uppercase tracking-[0.4em] font-medium">
                        Specializing in MERN & Next.js Ecosystems
                    </p>
                </motion.div>

            </div>
        </section>
    );
}


