"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Sparkles, MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { GlassCard } from "@/component/GlassCard";

/* -------------------- Project Image Slider -------------------- */
const ProjectImageSlider = ({ images }: { images: any[] }) => {
  const [index, setIndex] = useState(0);

  if (!images?.length) return <div className="w-full h-full bg-[#0c0c11] animate-pulse rounded-t-[2.5rem]" />;

  return (
    <div className="relative w-full h-full group/slider overflow-hidden rounded-t-[2.5rem]">
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img.url} alt="project" className="min-w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover/slider:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => { e.preventDefault(); setIndex(i => (i === 0 ? images.length - 1 : i - 1)); }}
            className="p-1.5 rounded-full bg-black/60 backdrop-blur-lg border border-white/10 text-white hover:bg-purple-600 transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); setIndex(i => (i === images.length - 1 ? 0 : i + 1)); }}
            className="p-1.5 rounded-full bg-black/60 backdrop-blur-lg border border-white/10 text-white hover:bg-purple-600 transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------- Full Projects Page -------------------- */
const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/all`);
        const data = res.data.data || res.data;
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))], [projects]);
  const filtered = useMemo(() => activeTab === "All" ? projects : projects.filter(p => p.category === activeTab), [activeTab, projects]);

  return (
    <main className="min-h-screen bg-[#09090d] text-white selection:bg-purple-500/30 overflow-x-hidden">

      {/* Background Aura */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-900/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-blue-900/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-24 lg:px-12">

        {/* Header - Tightened Space */}
        <header className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-400">Archive</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white">
              Selected <span className="text-purple-500">Works</span>
            </h1>
          </motion.div>
        </header>

        {/* Filter Tabs - Optimized Spacing */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative cursor-pointer px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${activeTab === cat
                ? "bg-purple-600 border-transparent text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] scale-105"
                : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-purple-500/30 backdrop-blur-md"
                }`}
            >
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid - Balanced Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="h-[280px] rounded-[2.5rem] bg-white/5 animate-pulse" />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((proj) => (
                <motion.div
                  layout
                  key={proj._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative"
                >
                  {/* Glow Aura */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-700 to-purple-500 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

                  <GlassCard className="relative h-[280px] rounded-[2.5rem] overflow-hidden bg-[#0c0c11]/90 p-0 border-white/10 group-hover:border-purple-500/40 group-hover:-translate-y-2 transition-all duration-500 flex flex-col z-10">

                    {/* Top Slider (70% Height) */}
                    <div className="h-[70%] overflow-hidden relative border-b border-white/5">
                      <ProjectImageSlider images={proj.images} />
                      <div className="absolute top-4 left-5">
                        <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-md backdrop-blur-md">
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Info (30% Height) */}
                    <div className="flex-1 px-6 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-white leading-tight group-hover:text-purple-400 transition-colors truncate">
                          {proj.title}
                        </h4>
                        <div className="flex gap-2.5 mt-1">
                          {proj.tech?.slice(0, 3).map((t: string, i: number) => (
                            <span key={i} className="text-[10px] text-gray-600 font-medium">
                              #{t.toLowerCase()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex gap-3.5 text-gray-600">
                          {proj.github && <a href={proj.github} target="_blank" className="hover:text-white transition-all"><Github size={16} /></a>}
                          {proj.live && <a href={proj.live} target="_blank" className="hover:text-purple-400 transition-all"><ExternalLink size={16} /></a>}
                        </div>
                        <Link
                          href={`/project/${proj._id}`}
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-xl"
                        >
                          <MoveRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>


      </div>
    </main>
  );
};

export default ProjectsPage;