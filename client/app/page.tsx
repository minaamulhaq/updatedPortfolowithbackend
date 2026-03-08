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
  Bot,
  Wrench,
  TerminalSquare,
  Send,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import AboutMe from "@/component/AboutMe";
import Workflow from "@/component/Workflow";
import Project from "@/component/Project";
import { SectionWrapper } from "@/component/SectionWrapper";

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

  "AI Tools & Automation": <Bot className="w-5 h-5" />,
  "DevOps & Tools": <Wrench className="w-5 h-5" />,
  Languages: <TerminalSquare className="w-5 h-5" />,
};




/* -------------------- Main Component -------------------- */

export default function Portfolio() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);

  const [loadingSkills, setLoadingSkills] = useState(true);

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



  /* -------------------- CV Download -------------------- */

  const handleDownload = () => {
    window.open("https://www.upwork.com/freelancers/~01d744b66a1d72a810?mp_source=share", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] text-gray-100 selection:bg-purple-500/30 overflow-x-hidden">

      {/* HERO */}
      <SectionWrapper id="hero" className="flex md:py-28 flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center min-h-[90vh] md:min-h-[80vh]">
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
              Software Engineer | AI/ML Enthusiast
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
                <Send size={18} />
                Hire Upwork
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
      <div className="relative bg-[#050505] border-y border-white/5 overflow-hidden">

        {/* Ambient Glow behind the text - Matching your Workflow style */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

        <SectionWrapper id="about" className="py-24 relative z-10">
          <div className="max-w-350 mx-auto px-6">

            {/* Header - Aligned with Engineering Flow Header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-purple-500 font-mono text-[10px] mb-2 uppercase tracking-[0.4em]">
            // background_info
                </h3>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
                  Building the <span className="text-white">Future</span> <br className="hidden md:block" />
                  with <span className="text-purple-500">Code & AI.</span>
                </h2>
              </div>
              <div className="h-1px flex-1 bg-white/5 mx-8 hidden md:block mb-4" />
              <div className="text-white/20 text-[10px] font-mono hidden md:block mb-4 uppercase tracking-[0.2em]">
                Inaam @ Dev_System
              </div>
            </div>

            {/* Content Body */}
            <div className="max-w-4xl">
              <div className="grid md:grid-cols-[1fr_auto_1fr] items-start gap-8 md:gap-12">

                <p className="text-base md:text-lg text-gray-400 leading-relaxed font-medium">
                  I am a results-driven developer specializing in modern web architecture. My expertise lies in bridging the gap between robust
                  <span className="text-white font-bold px-1 border-b border-purple-500/30">Full-Stack engineering</span>
                  and <span className="text-white font-bold px-1 border-b border-blue-500/30">Artificial Intelligence</span>.
                </p>

                {/* Vertical Divider (Desktop Only) */}
                <div className="hidden md:block w-1px h-32 bg-linear-to-b from-purple-500/50 to-transparent self-center" />

                <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                  Whether it's building RAG pipelines with LangChain or designing fluid user interfaces with Next.js, I focus on creating digital solutions that are as
                  <span className="text-purple-400 font-mono italic"> intelligent </span>
                  as they are
                  <span className="text-blue-400 font-mono italic"> functional</span>.
                </p>

              </div>

              {/* System Status Line - Matching your Footer Progress Lines */}
              <div className="mt-16 h-1px w-full bg-white/5 relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "30%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-linear-to-r from-purple-500 to-blue-500"
                />
                <div className="absolute -top-6 left-0 text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">
                  Status: System_Active // 2026
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>





      <AboutMe />
      <Workflow />

      {/* Skill */}

      <SectionWrapper id="skills" className="relative py-24 bg-[#050505] text-white overflow-hidden">

        {/* Ambient Background Elements - EXACT match to Workflow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-350 mx-auto px-6 relative z-10">

          {/* Header - Aligned with Engineering Flow Header */}
          <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">
                TECHNICAL <span className="text-purple-500">ARSENAL.</span>
              </h2>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                Tools & Technologies I Master
              </p>
            </div>
            <div className="h-1px flex-1 bg-white/5 mx-8 hidden md:block mb-4" />
            <div className="text-white/40 text-[10px] font-mono hidden md:block mb-4 uppercase tracking-widest">
              Inaam @ Portfolio 2026
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingSkills ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase text-center">INITIALIZING SYSTEM...</p>
              </div>
            ) : skills.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 font-mono text-xs uppercase tracking-widest italic">No data in database.</p>
            ) : (
              skills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* INNER CARD: Exact same style as Workflow Card */}
                  <div className="h-full bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl group-hover:border-purple-500/40 transition-all duration-500 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">

                    {/* Hover Radial Glow - Same as Workflow */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      {/* ICON & CATEGORY: Flex-row on mobile, Desktop stays Row for alignment */}
                      <div className="flex items-center gap-4 mb-8 relative z-10">

                        {/* Icon Design - Matching Workflow */}
                        <div className="relative shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-white/10 to-transparent border border-white/10 text-purple-400 group-hover:scale-110 group-hover:text-white group-hover:border-purple-500/50 transition-all duration-500 shadow-xl">
                            {iconMap[skill.category] || <Globe size={20} />}
                          </div>
                          {/* Active Decorative Dot */}
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-purple-500 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        </div>

                        <h3 className="text-xl font-bold tracking-tight text-gray-200 group-hover:text-white group-hover:tracking-wide transition-all duration-300">
                          {skill.category}
                        </h3>
                      </div>

                      {/* SKILL ITEMS - Badges with System Aesthetic */}
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {skill.items.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-[9px] font-mono font-medium bg-white/3 border border-white/5 rounded-lg text-gray-500 group-hover:text-purple-300 group-hover:border-purple-500/20 group-hover:bg-purple-500/5 transition-all duration-300 uppercase tracking-widest"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER PROGRESS LINE: Identical to Workflow footer */}
                    <div className="mt-8 relative z-10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/20 group-hover:text-purple-500/50 transition-colors">
                          System Verified
                        </span>
                      </div>
                      <div className="h-1px w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          className="h-full bg-linear-to-r from-purple-600 via-blue-500 to-purple-600"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </SectionWrapper>
      {/* PROJECTS */}


      <Project />


    </div>
  );
}
