"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    MapPin,
    Clock,
    Github,
    Linkedin,
    Twitter,
    Send,
    Sparkles,
    ArrowRight,
    Loader2,
    CheckCircle2
} from "lucide-react";
import axios from "axios";

// --- Types ---
interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

export default function ContactPage() {
    // 1. Form State Management
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    // 2. UI Status State
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    // 3. Dynamic Input Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // 4. Dynamic API Submission Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            // Simulate API Call (Replace with your actual fetch/axios call)
            console.log("Submitting to API:", formData);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/create`, formData);
            console.log("API Response:", response.data);

            // If successful:
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form



        } catch (error) {

            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-blue-500/30 overflow-x-hidden">

            {/* Background Layer */}
            <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[120px] rounded-full opacity-60" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-purple-600/10 blur-[120px] rounded-full opacity-60" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-20 lg:px-12">

                {/* --- HERO SECTION --- */}
                <section className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400 mb-6">
                            <Sparkles size={12} className="animate-pulse" /> Get in touch
                        </div>
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.05]">
                            Let’s Build Something <br className="hidden md:block" />
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-500 to-indigo-500">
                                Great Together.
                            </span>
                        </h1>
                    </motion.div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* LEFT: INFO CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5"
                    >
                        <div className="h-full bg-[#111119]/80 backdrop-blur-md border border-white/5 rounded-4xl p-8 md:p-10 flex flex-col justify-between shadow-2xl relative">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-3">Contact Details</h2>
                                <p className="text-gray-400 text-sm mb-12 leading-relaxed">Reach out directly through these platforms.</p>

                                <div className="space-y-4">
                                    <ContactItem icon={<Mail size={18} />} title="Email" value="minaamulhaq00@gmail.com" />
                                    <ContactItem icon={<MapPin size={18} />} title="Location" value="Lahore, Pakistan" />
                                    <ContactItem icon={<Clock size={18} />} title="Availability" value="Ready for work" />
                                </div>
                            </div>

                            <div className="mt-16 relative z-10">
                                <div className="flex gap-4">

                                    <motion.a

                                        href="https://github.com/minaamulhaq"
                                        whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all shadow-lg"
                                    >
                                        <Github size={20} />
                                    </motion.a>
                                    <motion.a

                                        href="https://github.com/minaamulhaq"
                                        whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all shadow-lg"
                                    >
                                        <Linkedin size={20} />
                                    </motion.a>
                                    <motion.a

                                        href="https://github.com/minaamulhaq"
                                        whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all shadow-lg"
                                    >
                                        <Twitter size={20} />
                                    </motion.a>


                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: DYNAMIC FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="h-full bg-[#111119]/80 backdrop-blur-md border border-white/5 rounded-4xl p-8 md:p-10 shadow-2xl">
                            <form className="space-y-6 h-full flex flex-col" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                                        <input
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full h-14.5 px-5 bg-white/3 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                            placeholder="Muhammad Inaam"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full h-14.5 px-5 bg-white/3 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                            placeholder="hello@inaam.dev"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Subject</label>
                                    <input
                                        id="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full h-14.5 px-5 bg-white/3 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 grow">
                                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-white/3 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all resize-none text-sm grow"
                                        placeholder="Tell me about your vision..."
                                    />
                                </div>

                                <motion.button
                                    disabled={status === "loading" || status === "success"}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full h-15 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-xl transition-all mt-4 group ${status === "success"
                                        ? "bg-green-500 text-white"
                                        : "bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
                                        } disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    {status === "idle" && (
                                        <>Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                    {status === "loading" && (
                                        <><Loader2 size={18} className="animate-spin" /> Processing...</>
                                    )}
                                    {status === "success" && (
                                        <><CheckCircle2 size={18} /> Message Sent!</>
                                    )}
                                    {status === "error" && "Something went wrong. Try again."}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}

function ContactItem({ icon, title, value }: ContactItemProps) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/3 group transition-all">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">{icon}</div>
            <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-600">{title}</p>
                <p className="text-sm font-medium text-gray-300">{value}</p>
            </div>
        </div>
    );
}