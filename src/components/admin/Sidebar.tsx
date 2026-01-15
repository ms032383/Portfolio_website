"use client";

import { LayoutDashboard, FolderGit2, Cpu, Trophy, Settings, LogOut, Eye } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const TABS = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "repository", label: "Repository", icon: FolderGit2 },
    { id: "tech-stack", label: "Tech Stack", icon: Cpu },
    { id: "hall-of-fame", label: "Hall of Fame", icon: Trophy },
    { id: "config", label: "System Config", icon: Settings },
];

export function AdminSidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
    const { logout } = useAdmin();

    return (
        <aside className="w-64 border-r border-white/5 bg-[#09090b] flex flex-col">
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="w-4 h-4 rounded bg-white/20"></div>
                    </div>
                    <div>
                        <h1 className="font-bold text-sm tracking-wide">MohanOS</h1>
                        <p className="text-xs text-white/30 font-mono">Control Center</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon size={18} className={isActive ? "text-primary" : "opacity-70"} />
                            {tab.label}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5 space-y-2">
                <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all">
                    <Eye size={18} />
                    Live Preview
                </a>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
