"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, ChevronRight, Linkedin, Github, Mail, Send } from "lucide-react";
import Link from "next/link"; // Import Next.js Link

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/project" },
    { name: "Contact", href: "/contact" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    // Updated Logic: Only prevent default if it's an ID on the same page
    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsOpen(false);

        if (href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
        // If it's not a "#", we let Next.js Link handle the page change normally
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled || isOpen
                ? "py-4 bg-[#0f0f14] border-b border-white/5 shadow-2xl"
                : "py-6 bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 z-[101] relative">
                    <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shrink-0">
                        <Cpu size={18} className="text-white md:w-5 md:h-5" />
                    </div>
                    <span className="text-lg md:text-xl font-bold tracking-tighter text-white whitespace-nowrap">
                        Inaam<span className="text-purple-500">.dev</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e: any) => handleNavigation(e, link.href)}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                    <button className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all">
                        Hire Me
                    </button>
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden p-2 text-gray-300 hover:text-white transition-colors z-[101]"
                >
                    <Menu size={28} />
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/95 z-[150] md:hidden"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#0f0f14] border-l border-white/10 z-[160] flex flex-col md:hidden shadow-2xl"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 bg-purple-500/20 rounded">
                                        <Cpu size={16} className="text-purple-500" />
                                    </div>
                                    <span className="font-bold text-white text-xs uppercase tracking-widest">Navigation</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col p-6 gap-3 flex-grow overflow-y-auto">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e: any) => handleNavigation(e, link.href)}
                                            className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-xl group active:bg-purple-600/20"
                                        >
                                            <span className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors">
                                                {link.name}
                                            </span>
                                            <ChevronRight size={18} className="text-gray-600 group-hover:text-purple-500 transition-all" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="p-6 border-t border-white/5 bg-[#0d0d12] space-y-6">
                                <div className="flex justify-center gap-8 text-gray-500">
                                    <a href="#" className="hover:text-white transition-colors"><Linkedin size={22} /></a>
                                    <a href="#" className="hover:text-white transition-colors"><Github size={22} /></a>
                                    <a href="#" className="hover:text-white transition-colors"><Mail size={22} /></a>
                                </div>
                                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all">
                                    <Send size={18} />
                                    Hire Me
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}