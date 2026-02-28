"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

export default function Login() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password.trim()) {
            toast("Password is required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
                { password },
                { withCredentials: true }
            );

            if (res.data?.success) {
                router.push("/admin/dashboard");
            } else {
                toast.error(res.data?.message || "Invalid password");
            }

        } catch (error: any) {
            // 🔥 Proper Error Handling
            if (error.response) {
                // Server responded with status code (401, 500, etc.)
                if (error.response.status === 401) {
                    toast.error("Incorrect password. Please try again.");
                } else if (error.response.status === 500) {
                    toast.error("Server error. Please try later.");
                } else {
                    toast.error(error.response.data?.message || "Login failed.");
                }
            } else if (error.request) {
                // Request was made but no response received
                toast.error("Unable to connect to server.");
            } else {
                // Something else happened
                toast.error("Unexpected error occurred.");
            }

            console.error("Login error:", error);
        } finally {
            setLoading(false);
            setPassword("");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f14] text-white px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#16161d]/70 border border-white/10 backdrop-blur-md rounded-2xl p-10 max-w-md w-full shadow-lg"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-white/20 bg-[#121218] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter admin password"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-bold transition-all"
                    >
                        {loading ? "Checking..." : "Login"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}