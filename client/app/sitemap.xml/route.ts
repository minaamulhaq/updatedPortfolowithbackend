import { NextResponse } from "next/server";
import { SitemapStream, streamToPromise } from "sitemap";

export const dynamic = 'force-dynamic';

export async function GET() {
    const baseUrl = "https://www.minaaulhaq.me";
    const sitemap = new SitemapStream({ hostname: baseUrl });

    try {
        // ✅ Static pages
        sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 });
        sitemap.write({ url: "/contact", changefreq: "monthly", priority: 0.7 });

        // ✅ Dynamic projects
        const res = await fetch(`${baseUrl}/api/projects`);
        if (res.ok) {
            const projects = await res.json();
            if (projects.data && Array.isArray(projects.data)) {
                projects.data.forEach((p: any) => {
                    sitemap.write({ url: `/project/${p._id}`, changefreq: "weekly", priority: 0.9 });
                });
            }
        }
    } catch (error) {
        console.error("Error generating sitemap projects:", error);
    }

    sitemap.end();
    const xml = await streamToPromise(sitemap);

    return new NextResponse(xml.toString(), {
        headers: { "Content-Type": "application/xml" },
    });
}