import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Inaam Ul Haq | Business Problem Solver, Full Stack Developer & ML Engineer",
    template: "%s | Inaam Ul Haq",
  },

  description:
    "Inaam Ul Haq is a Business Problem Solver, Full Stack Developer, Machine Learning Engineer, and Database Specialist. I help businesses build scalable systems, automate workflows, and create high-performance applications that drive real growth. Explore projects and solutions at https://www.minaaulhaq.me/project.",

  keywords: [
    "Business Problem Solver",
    "Inaam Ul Haq",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "Database Specialist",
    "AI Solutions Developer",
    "Automation Expert",
    "Next.js Developer",
    "Node.js Developer",
    "Scalable Systems",
    "Software Solutions",
    "Web Developer USA",
  ],

  authors: [{ name: "Inaam Ul Haq" }],
  creator: "Inaam Ul Haq",
  publisher: "Inaam Ul Haq",

  metadataBase: new URL("https://www.minaaulhaq.me"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Inaam Ul Haq | Business Problem Solver & Software Engineer",
    description:
      "Helping businesses solve real-world problems through scalable web apps, AI systems, and optimized databases. View portfolio and projects.",
    url: "https://www.minaaulhaq.me",
    siteName: "Inaam Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inaam Ul Haq Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Inaam Ul Haq | Business Problem Solver",
    description:
      "Portfolio of Inaam Ul Haq focused on solving business problems using technology, AI, and scalable systems.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
