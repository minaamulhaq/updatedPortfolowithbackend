"use client";

import React, { useState } from "react";

interface Images {
    url: string;
    public_id: string;
}

interface ProjectGalleryProps {
    images: Images[];
}

export const ProjectGallery = ({ images }: ProjectGalleryProps) => {
    const [activeImage, setActiveImage] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video relative group">
                <img
                    src={images[activeImage]?.url}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt="Current Preview"
                />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative min-w-[120px] h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-500 scale-95' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                        <img src={img.url} className="w-full h-full object-cover" alt="thumb" />
                    </button>
                ))}
            </div>
        </div>
    );
};
