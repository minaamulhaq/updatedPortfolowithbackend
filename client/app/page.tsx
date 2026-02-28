"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Cpu,
  Globe,
  ChevronRight,
  FileDown,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

/* -------------------- Types -------------------- */

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  link?: string;
}

interface SkillCategory {
  _id: string;
  category: string;
  items: string[];
}

/* -------------------- Icon Mapping -------------------- */

const iconMap: Record<string, React.ReactNode> = {
  Frontend: <Globe className="w-5 h-5" />,
  Backend: <Code2 className="w-5 h-5" />,
  "AI & Advanced": <Cpu className="w-5 h-5" />,
};

/* -------------------- Reusable Components -------------------- */

const SectionWrapper = ({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`py-16 md:py-28 px-5 md:px-12 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-[#16161d] border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

/* -------------------- Main Component -------------------- */

export default function Portfolio() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [cvs, setCvs] = useState<any>(null);
  /* -------------------- Fetch Skills -------------------- */

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get<{ success: boolean; data: SkillCategory[] }>(
          `${process.env.NEXT_PUBLIC_API_URL}/skill/all`
        );
        const { data } = res.data;
        setSkills(data || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  /* -------------------- Fetch Projects -------------------- */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/project/all`
        );
        const file = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cv/download`);
        setCvs(file.data.cv);
        const data: Project[] = await res.json();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  /* -------------------- CV Download -------------------- */

  const handleDownload = () => {
    if (!cvs || cvs.length === 0) return toast("No CV available");
    console.log("CVs:", cvs);
    // Directly open the API endpoint in a new tab/window
    // The backend's res.redirect + "attachment" flag will trigger the download automatically
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/cv/download/${cvs._id}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-gray-100 selection:bg-purple-500/30 overflow-x-hidden">

      {/* HERO */}
      <SectionWrapper id="hero" className="flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center min-h-[90vh] md:min-h-[80vh]">
        <div className="space-y-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-purple-400 font-semibold mb-4 tracking-[0.2em] uppercase text-xs md:text-sm flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Available for new projects
            </h2>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
              Hi, I’m <br className="hidden md:block" />
              <span className="bg-linear-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Inaam ul Haq
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 mt-6 font-medium">
              Full-Stack Developer | AI Enthusiast
            </p>
            <p className="text-gray-500 max-w-lg mt-4 leading-relaxed mx-auto md:mx-0 text-sm md:text-base">
              Crafting intelligent, high-performance web applications with a focus on AI integration and scalable architecture.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Main Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full">
              {/* View Projects Button */}
              <Link href="/project" className="w-full sm:w-auto">
                <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-purple-500 hover:text-white transition-all duration-300">
                  View Projects
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Contact Me Button */}
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-all duration-300">
                  Contact Me
                </button>
              </Link>
            </div>

            {/* Socials & CV Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {[
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/m-inaam-ul-haq/", label: "LinkedIn" },
                { icon: <Github size={20} />, href: "https://github.com/minaamulhaq", label: "GitHub" },
                { icon: <Mail size={20} />, href: "mailto:minaamulhaq00@gmail.com", label: "Email" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-purple-500/20 hover:border-purple-500/50 transition-all text-gray-400 hover:text-white"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}

              <div className="h-8 w-1px bg-white/10 mx-2 hidden sm:block"></div>

              <button onClick={handleDownload} className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 border border-purple-500/30 rounded-xl hover:bg-purple-500 hover:text-white transition-all text-purple-400 text-sm font-bold">
                <FileDown size={18} />
                Download CV
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center w-full"
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-purple-600 rounded-full blur-[60px] opacity-20"></div>

            <div className="relative w-full h-full rounded-full border border-white/10 p-3 md:p-4">
              <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-[#16161d] shadow-2xl">
                <Image
                  src="/inaam.jpg"
                  alt="Muhammad Inaam ul Haq"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>


      {/* 🧑‍💼 ABOUT SECTION */}
      <div className="bg-[#121218]/50 border-y border-white/5">
        <SectionWrapper id="about">
          <div className="max-w-3xl">
            <h3 className="text-blue-400 font-mono text-sm mb-4 uppercase tracking-widest">// background_info</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Building the future with code and AI.</h2>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-6">
              I am a results-driven developer specializing in modern web architecture. My expertise lies in bridging the gap between robust <strong>Full-Stack engineering</strong> and <strong>Artificial Intelligence</strong>.
            </p>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Whether it's building RAG pipelines with LangChain or designing fluid user interfaces with Next.js, I focus on creating digital solutions that are as intelligent as they are functional.
            </p>
          </div>
        </SectionWrapper>
      </div>



      {/* SKILLS */}
      <SectionWrapper id="skills">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Technical Arsenal
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingSkills ? (
            <p className="col-span-full text-center text-gray-500">
              Loading skills...
            </p>
          ) : skills.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No skills found.
            </p>
          ) : (

            skills.map((skill) => (
              <GlassCard key={skill._id}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-600/10 rounded-xl text-purple-500">
                    {iconMap[skill.category] || (
                      <Globe className="w-5 h-5" />
                    )}
                  </div>
                  <h4 className="text-xl font-bold">
                    {skill.category}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </SectionWrapper>

      {/* PROJECTS */}
      <SectionWrapper id="projects" className="bg-[#0c0c11]/50 rounded-[3rem]">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Selected Work
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loadingProjects ? (
            <p className="col-span-full text-center text-gray-500">
              Loading projects...
            </p>
          ) : projects.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No projects found.
            </p>
          ) : (
            projects.map((proj) => (
              <GlassCard key={proj._id} className="flex flex-col h-full">
                <div className="flex justify-between mb-4">
                  <h4 className="text-xl font-bold">
                    {proj.title}
                  </h4>

                  <div className="flex gap-3 text-gray-500">
                    {proj.github && (
                      <a href={proj.github}>
                        <Github size={18} />
                      </a>
                    )}
                    {proj.link && (
                      <a href={proj.link}>
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-500 text-sm grow mb-6">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tech?.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase font-bold text-blue-400/80"
                    >
                      {t}
                      {i !== proj.tech.length - 1 && " •"}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </SectionWrapper>

    </div>
  );
}