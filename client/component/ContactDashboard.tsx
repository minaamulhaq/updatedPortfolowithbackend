"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Contact {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export default function ContactDashboard() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/contact/all`,
                    { withCredentials: true }
                );
                setContacts(res.data);

            } catch (error) {
                console.error("Error fetching contacts:", error);
                toast("Failed to fetch contacts");
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // ------------------- CSV Export Function -------------------
    const exportToCSV = () => {
        if (!contacts.length) return toast("No data to export");

        const headers = ["Name", "Email", "Subject", "Message", "CreatedAt"];
        const rows = contacts.map(c => [
            c.name,
            c.email,
            c.subject,
            c.message.replace(/\n/g, " "), // remove newlines
            new Date(c.createdAt).toLocaleString(),
        ]);

        let csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map(e => e.map(v => `"${v}"`).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `contacts_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast("CSV exported successfully!");
    };

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-400">
                Loading contact messages...
            </div>
        );
    }

    return (
        <div className="bg-[#16161d] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Contact Messages</h2>
                <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition"
                >
                    Export CSV
                </button>
            </div>

            {contacts.length === 0 ? (
                <div className="text-gray-400">No messages found.</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {contacts.map((contact) => {
                        const isExpanded = expandedId === contact._id;

                        return (
                            <div
                                key={contact._id}
                                className="bg-[#1c1c25] border border-white/5 rounded-2xl p-4 hover:border-purple-500/30 transition"
                            >
                                {/* Header */}
                                <div
                                    className="flex flex-col md:flex-row md:justify-between md:items-center cursor-pointer"
                                    onClick={() => toggleExpand(contact._id)}
                                >
                                    <div className="flex flex-col md:flex-row md:gap-4">
                                        <span className="font-semibold text-white">
                                            {contact.name}
                                        </span>
                                        <span className="text-gray-400 text-sm">{contact.email}</span>
                                    </div>
                                    <span className="text-purple-400 mt-2 md:mt-0">
                                        {isExpanded ? "Hide Details" : "View Details"}
                                    </span>
                                </div>

                                {/* Expanded Description */}
                                {isExpanded && (
                                    <div className="mt-3 text-gray-300 text-sm">
                                        <p className="mb-2">
                                            <span className="font-semibold">Name:</span> {contact.name}
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">Email:</span> {contact.email}
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">Subject:</span> {contact.subject}
                                        </p>
                                        <p className="mb-2">
                                            <span className="font-semibold">Message:</span>
                                        </p>
                                        <p className="ml-2">{contact.message}</p>
                                        <p className="mt-2 text-gray-500 text-xs">
                                            Submitted on: {new Date(contact.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}