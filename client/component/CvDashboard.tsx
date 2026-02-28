"use client";

import React, { useState, useEffect, DragEvent } from "react";
import axios from "axios";
import { UploadCloud, X, Loader2 } from "lucide-react";

interface CV {
    _id: string;
    fileUrl: string;
    createdAt: string;
}

export default function CvDashboard() {
    const [cvs, setCvs] = useState<CV[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // Fetch existing CVs
    useEffect(() => {
        const fetchCvs = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cv/all`);
                setCvs(res.data.cvs || []);
            } catch (error) {
                console.error("Error fetching CVs:", error);
            }
        };
        fetchCvs();
    }, []);

    // Handle drag events
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);

        if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

        const file = e.dataTransfer.files[0];
        await uploadCv(file);
    };

    // Handle file selection via input
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        await uploadCv(file);
    };

    // Upload CV to server
    const uploadCv = async (file: File) => {
        try {
            setUploading(true);
            setProgress(0);

            const formData = new FormData();
            formData.append("cv", file);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cv/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setProgress(percent);
                },
            });

            setCvs((prev) => [res.data, ...prev]);
        } catch (error) {
            console.error("Error uploading CV:", error);
            alert("Failed to upload CV");
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    // Delete CV
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cv/delete/${id}`);
            setCvs((prev) => prev.filter((cv) => cv._id !== id));
        } catch (error) {
            console.error("Error deleting CV:", error);
        }
    };

    return (
        <div className="bg-[#16161d] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl w-full  mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">CV Dashboard</h2>

            {/* Drag & Drop Area */}
            <div
                className={`relative w-full h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${dragOver ? "border-purple-500 bg-[#1c1c25]" : "border-white/20"
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <UploadCloud size={36} className="text-purple-400 mb-2" />
                <p className="text-gray-400 mb-2 text-center px-4">
                    Drag & Drop your CV here or click to upload
                </p>

                {/* Hidden file input */}
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />

                {/* Circular upload animation */}
                {uploading && (
                    <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-full h-full bg-black/50 rounded-2xl">
                        <Loader2 className="animate-spin text-purple-400 mb-2" size={28} />
                        <span className="text-white font-medium">{progress}%</span>
                    </div>
                )}
            </div>

            {/* Existing CVs */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-200">Existing CVs</h3>
                {cvs.length === 0 ? (
                    <p className="text-gray-400">No CVs uploaded yet.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {cvs.map((cv) => (
                            <div
                                key={cv._id}
                                className="flex flex-col md:flex-row justify-between items-center bg-white/5 rounded-xl p-3 border border-white/10 gap-2 md:gap-0"
                            >
                                {/* Correct raw Cloudinary link */}
                                <a
                                    href={cv.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-100 font-medium hover:text-purple-400 break-all"
                                >
                                    {cv.fileUrl.split("/").pop() || "CV File"}
                                </a>
                                <button
                                    onClick={() => handleDelete(cv._id)}
                                    className="text-red-500 hover:text-red-600 transition mt-2 md:mt-0"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}