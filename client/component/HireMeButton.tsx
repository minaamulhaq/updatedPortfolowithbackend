"use client";

import React from "react";
import { Send } from "lucide-react";

export const HireMeButton = () => {
    return (
        <button
            onClick={() => window.open("https://www.linkedin.com/in/m-inaam-ul-haq/", "_blank")}
            className="
                    w-full
                    h-12 cursor-pointer
                    flex items-center justify-center gap-2
                    bg-white
                    text-black
                    font-bold uppercase tracking-widest
                    rounded-full
                    shadow-[0_5px_15px_rgba(0,0,0,0.1)]
                    transition-all duration-500
                    hover:bg-purple-600
                    hover:text-white
                    hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                    active:scale-95
                "
        >
            <Send size={16} />
            Hire Me
        </button>
    );
};
