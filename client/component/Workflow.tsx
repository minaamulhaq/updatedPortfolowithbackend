"use client"

import React from "react"
import { motion } from "framer-motion"
import {
    ClipboardCheck,
    DraftingCompass,
    Code2,
    Bug,
    Rocket,
    Activity,
    ChevronRight
} from "lucide-react"

const workflow = [
    {
        title: "Analysis",
        desc: "Transforming ideas into technical roadmaps.",
        icon: <ClipboardCheck size={20} />,
        tag: "Phase 01"
    },
    {
        title: "Architecture",
        desc: "Designing scalable systems and database models.",
        icon: <DraftingCompass size={20} />,
        tag: "Phase 02"
    },
    {
        title: "Development",
        desc: "Building clean frontend and backend codebases.",
        icon: <Code2 size={20} />,
        tag: "Phase 03"
    },
    {
        title: "Validation",
        desc: "Rigorous testing for maximum reliability.",
        icon: <Bug size={20} />,
        tag: "Phase 04"
    },
    {
        title: "Production",
        desc: "Pushing code through CI/CD pipelines.",
        icon: <Rocket size={20} />,
        tag: "Phase 05"
    },
    {
        title: "Maintenance",
        desc: "Continuous monitoring and performance tuning.",
        icon: <Activity size={20} />,
        tag: "Phase 06"
    }
]

export default function CompactWorkflow() {
    return (
        <section className="relative py-24 bg-[#050505] text-white overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-350 mx-auto px-6 relative z-10">

                {/* Minimalist Header */}
                <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">
                            ENGINEERING <span className="text-purple-500 text-glow">FLOW.</span>
                        </h2>
                        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                            End-to-end development lifecycle
                        </p>
                    </div>
                    <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block mb-4" />
                    <div className="text-white/40 text-[10px] font-mono hidden md:block mb-4 uppercase tracking-widest">
                        Inaam @ Portfolio 2026
                    </div>
                </div>

                {/* Workflow Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {workflow.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="h-full bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-2xl group-hover:border-purple-500/40 transition-all duration-500 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">

                                {/* Hover Radial Glow */}
                                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div>
                                    {/* ICON & TITLE: Flexible Layout */}
                                    <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4">

                                        {/* Icon Design */}
                                        <div className="relative shrink-0">
                                            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-linear-to-br from-white/10 to-transparent border border-white/10 text-purple-400 group-hover:scale-110 group-hover:text-white group-hover:border-purple-500/50 transition-all duration-500 shadow-xl">
                                                {step.icon}
                                            </div>
                                            {/* Decorative Active Dot */}
                                            <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-purple-500 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                        </div>

                                        {/* Title Design */}
                                        <h3 className="text-base md:text-lg font-bold md:mt-6 tracking-wide text-gray-200 group-hover:text-white group-hover:tracking-wider transition-all duration-300">
                                            {step.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 md:line-clamp-3 group-hover:text-gray-400 transition-colors">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Footer Progress Section */}
                                <div className="mt-6 md:mt-8">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/20">
                                            {step.tag}
                                        </span>
                                    </div>

                                    {/* Thin Engineering Progress Line */}
                                    <div className="h-px w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 1.5, delay: index * 0.2 }}
                                            className="h-full bg-linear-to-r from-purple-600 via-blue-500 to-purple-600"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Connectivity Arrow (Desktop Only) */}
                            {index !== workflow.length - 1 && (
                                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-white/10 group-hover:text-purple-500/50 group-hover:translate-x-1 transition-all">
                                    <ChevronRight size={14} strokeWidth={3} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .text-glow {
                    text-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
                }
            `}</style>
        </section>
    )
}