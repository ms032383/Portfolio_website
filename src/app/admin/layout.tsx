"use client";

import { AdminProvider } from "@/context/AdminContext";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
            <AdminProvider>
                {children}
            </AdminProvider>
        </div>
    );
}
