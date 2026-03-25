import React from "react";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";
import { Metadata } from "next";

/* -------------------- Types -------------------- */
interface Images {
    url: string;
    public_id: string;
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
    createdAt: string;
}

/* -------------------- SEO Metadata -------------------- */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        const data = await res.json();
        const project: Project = data.data;

        if (!project) {
            return {
                title: "Project Not Found",
            };
        }

        return {
            title: `${project.title} | Portfolio`,
            description: project.description.substring(0, 160),
            openGraph: {
                title: project.title,
                description: project.description.substring(0, 160),
                images: project.images.map(img => ({ url: img.url })),
            },
            twitter: {
                card: "summary_large_image",
                title: project.title,
                description: project.description.substring(0, 160),
                images: [project.images[0]?.url],
            }
        };
    } catch (error) {
        return {
            title: "Project Details",
        };
    }
}

/* -------------------- Server Component -------------------- */
export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let project: Project | null = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
            next: { revalidate: 3600 }
        });
        const data = await res.json();
        project = data.data;
    } catch (error) {
        console.error("Error fetching project:", error);
    }

    if (!project) {
        notFound();
    }

    return <ProjectClient project={project} />;
}