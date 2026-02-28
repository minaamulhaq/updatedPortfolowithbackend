"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import axios from "axios";

/* -------------------- Types -------------------- */

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  tech?: string[];
  github?: string;
  live?: string;
}

/* -------------------- Component -------------------- */

const ProjectsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* -------------------- Fetch Projects -------------------- */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get<Project[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/project/all?limit=100`
        );

        setProjects(res.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* -------------------- Dynamic Categories -------------------- */

  const categories = useMemo<string[]>(() => {
    const unique = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(unique)];
  }, [projects]);

  /* -------------------- Filter Logic -------------------- */

  const filteredProjects = useMemo<Project[]>(() => {
    if (activeTab === "All") return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab, projects]);

  return (
    <main className="min-h-screen bg-linear-to-b from-[#0f0f14] via-[#0d0d12] to-[#0a0a0f] text-white selection:bg-purple-500/30">

      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 lg:px-12">

        {/* Hero */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400 mb-6">
              <Sparkles size={12} /> Portfolio Showcase
            </span>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Selected{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                Projects
              </span>
            </h1>
          </motion.div>
        </section>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border ${activeTab === cat
                ? "bg-linear-to-r from-blue-600 to-purple-600 border-transparent shadow-lg shadow-purple-500/20"
                : "bg-white/5 border-white/10 hover:border-white/20 text-gray-400 hover:text-white backdrop-blur-md"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400">Loading projects...</div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center text-gray-500">
            No projects found in this category.
          </div>
        )}

        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj, index) => (
                <motion.div
                  layout
                  key={proj._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col h-full bg-[#16161d]/50 border border-white/10 rounded-4xl p-8 hover:bg-white/3 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 group"
                >
                  {/* Title + Icons */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                      {proj.title}
                    </h3>

                    <div className="flex gap-3 text-gray-500">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          <Github size={18} />
                        </a>
                      )}

                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base mb-8 grow leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {proj.tech?.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] uppercase tracking-wider font-bold text-blue-400/80"
                      >
                        {tech}
                        {i !== proj.tech!.length - 1 && " •"}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer */}
        <div className="mt-24 text-center">
          <p className="text-gray-500 text-sm italic">
            More experiments available on my GitHub profile.
          </p>
        </div>

      </div>
    </main>
  );
};

export default ProjectsPage;