"use client";

import { useAdmin } from "@/context/AdminContext";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { useState } from "react";

// Placeholder components for sections
import { Repository } from "@/components/admin/Repository";
import { TechStack } from "@/components/admin/TechStack";
import { HallOfFame } from "@/components/admin/HallOfFame";
import { Config } from "@/components/admin/Config";
import { DashboardOverview } from "@/components/admin/DashboardOverview";

export default function AdminPage() {
    const { isAuthenticated, isLoading } = useAdmin();
    const [activeTab, setActiveTab] = useState("overview");

    if (isLoading) return <div className="h-screen w-screen bg-black flex items-center justify-center text-white">Loading System...</div>;

    if (!isAuthenticated) {
        return <AdminAuth />;
    }

    return (
        <div className="flex h-screen bg-[#09090b] text-white overflow-hidden">
            {/* Sidebar */}
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-[#09090b] relative">
                {/* Desktop Header / Breadcrumb */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#09090b]/80 backdrop-blur-md z-10">
                    <h2 className="text-xl font-bold capitalize tracking-tight">{activeTab.replace("-", " ")}</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs text-white/40 font-mono">SYSTEM ONLINE</span>
                    </div>
                </header>

                <div className="p-8 pb-20">
                    {activeTab === "overview" && <DashboardOverview />}
                    {activeTab === "repository" && <Repository />}
                    {activeTab === "tech-stack" && <TechStack />}
                    {activeTab === "hall-of-fame" && <HallOfFame />}
                    {activeTab === "config" && <Config />}
                </div>
            </main>
        </div>
    );
}
