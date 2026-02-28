"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Phone, MapPin, ChevronUp } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0f0f14] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* ---------------- Logo & CTA ---------------- */}
                <div className="flex flex-col items-start gap-6">
                    <a href="#hero" className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-500 to-indigo-500">
                        Inaam.dev
                    </a>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/contact"
                        className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold shadow-lg shadow-purple-500/30 transition-all"
                    >
                        Let’s Talk
                    </motion.a>
                </div>

                {/* ---------------- Navigation Links ---------------- */}
                <div className="flex flex-col gap-3 md:gap-2 text-gray-400">
                    <h4 className="text-white font-semibold mb-2">Quick Links</h4>
                    {["Home", "About", "Skills", "Projects", "Contact"].map((link, i) => (
                        <a
                            key={i}
                            href={`/#${link.toLowerCase()}`}
                            className="hover:text-white transition-colors"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* ---------------- Contact Info ---------------- */}
                <div className="flex flex-col gap-3 text-gray-400">
                    <h4 className="text-white font-semibold mb-2">Contact</h4>
                    <div className="flex items-center gap-2">
                        <Mail size={18} />
                        <a href="mailto:minaamulhaq00@gmail.com" className="hover:text-white transition-colors">
                            minaamulhaq00@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone size={18} />
                        <span>+92 345 9624341</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>Lahore, Pakistan</span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        <a href="https://www.linkedin.com/in/m-inaam-ul-haq" className="hover:text-white transition-colors"><Linkedin size={22} /></a>
                        <a href="https://github.com/minaamulhaq" className="hover:text-white transition-colors"><Github size={22} /></a>
                        <a href="mailto:minaamulhaq00@gmail.com" className="hover:text-white transition-colors"><Mail size={22} /></a>
                    </div>
                </div>
            </div>

            {/* ---------------- Scroll to Top & Copyright ---------------- */}
            <div className="border-t border-white/10 mt-8 pt-4 flex justify-center items-center gap-2 text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} Muhammad Inaam ul Haq. All Rights Reserved.</p>
                <a href="#hero" className="hover:text-white transition-colors">
                    <ChevronUp size={18} />
                </a>
            </div>
        </footer>
    );
}
