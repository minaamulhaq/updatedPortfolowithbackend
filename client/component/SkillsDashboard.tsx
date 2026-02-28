"use client";

import React, { useState, useEffect } from "react";
import { Code2, Cpu, Globe, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

/* -------------------- Types -------------------- */
interface SkillCategory {
    _id: string;
    category: string;
    items: string[];
}

/* -------------------- Icon Map -------------------- */
const iconMap: Record<string, React.ReactNode> = {
    Frontend: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
    Backend: <Code2 className="w-5 h-5 md:w-6 md:h-6" />,
    "AI & Advanced": <Cpu className="w-5 h-5 md:w-6 md:h-6" />,
};

/* -------------------- Main Component -------------------- */
export default function SkillsDashboard() {
    const [skills, setSkills] = useState<SkillCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newSkill, setNewSkill] = useState("");

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/skill/all`);
                setSkills(res.data.data || []);
                if (res.data.data?.length) setSelectedCategory(res.data.data[0].category);
            } catch (err) {

                toast("Failed to fetch skills");
                // Dummy data fallback
                setSelectedCategory("Frontend");
            }
        };

        fetchSkills();
    }, []);

    /* -------------------- Helper Functions -------------------- */
    const handleAddSkill = () => {
        if (!newSkill) return;
        setSkills((prev) =>
            prev.map((cat) =>
                cat.category === selectedCategory
                    ? { ...cat, items: [...cat.items, newSkill] }
                    : cat
            )
        );
        setNewSkill("");
    };

    const handleRemoveSkill = (skillName: string) => {
        setSkills((prev) =>
            prev.map((cat) =>
                cat.category === selectedCategory
                    ? { ...cat, items: cat.items.filter((item) => item !== skillName) }
                    : cat
            )
        );
    };

    const handleSave = async () => {
        const currentCat = skills.find((s) => s.category === selectedCategory);
        if (!currentCat) return;

        try {
            const payload = {
                _id: currentCat._id,
                category: currentCat.category,
                items: currentCat.items,
            };
            const update = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/skill/update/${currentCat._id}`, payload);

            if (update.data.success) {
                toast("Skills updated successfully!");
            }
        } catch (err) {
            console.error("Failed to update skills:", err);
            toast("Error saving skills. Check console.");
        }
    };

    const currentCategory = skills.find((s) => s.category === selectedCategory);

    return (
        <div className="bg-[#16161d] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 w-full">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="p-3 bg-purple-600/10 rounded-xl text-purple-500">
                    {iconMap[selectedCategory] || <Globe className="w-5 h-5 md:w-6 md:h-6" />}
                </div>
                <h2 className="text-xl md:text-2xl font-bold">{selectedCategory || "Select Category"}</h2>
            </div>

            {/* Category Dropdown */}
            <div className="mb-6">
                <label htmlFor="category-select" className="block mb-2 text-gray-400 font-semibold text-sm md:text-base">
                    Select Skill Category
                </label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#121218] border border-white/20 text-white focus:outline-none text-sm md:text-base"
                >
                    {skills.map((s) => (
                        <option key={s._id} value={s.category}>
                            {s.category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Skills List */}
            <div className="mb-6 max-h-48 overflow-y-auto">
                <h3 className="text-gray-400 mb-2 font-semibold text-sm md:text-base">Current Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {currentCategory?.items.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-gray-300 text-xs md:text-sm"
                        >
                            <span>{item}</span>
                            <X
                                className="w-3 h-3 cursor-pointer hover:text-red-500"
                                onClick={() => handleRemoveSkill(item)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Add New Skill */}
            <div className="mb-6">
                <label htmlFor="new-skill" className="block mb-2 text-gray-400 font-semibold text-sm md:text-base">
                    Add New Skill
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        id="new-skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter skill name"
                        className="flex-1 p-3 rounded-xl bg-[#121218] border border-white/20 text-white focus:outline-none text-sm md:text-base"
                    />
                    <button
                        onClick={handleAddSkill}
                        className="px-4 py-3 bg-purple-500 rounded-xl font-bold hover:bg-purple-600 transition-all text-sm md:text-base"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-4">
                <button
                    onClick={handleSave}
                    className="w-full py-3 bg-green-500 rounded-xl font-bold hover:bg-green-600 transition-all text-white text-sm md:text-base"
                >
                    Save Changes
                </button>
            </div>
        </div>

    );
}