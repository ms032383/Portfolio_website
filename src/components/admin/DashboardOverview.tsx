"use client";

import { useAdmin } from "@/context/AdminContext";
import { Activity, Users, Eye, Clock, ShieldCheck, Cpu } from "lucide-react";

export function DashboardOverview() {
    const { data } = useAdmin();

    const stats = [
        { label: "Total Visits", value: "24.5k", change: "+12%", icon: Eye, color: "text-blue-400" },
        { label: "System Health", value: "98%", change: "Stable", icon: Activity, color: "text-green-400" },
        { label: "Active Sessions", value: "12", change: "Now", icon: Users, color: "text-purple-400" },
        { label: "Uptime", value: "14d 2h", change: "Record", icon: Clock, color: "text-orange-400" },
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-6 flex flex-col gap-4 hover:bg-white/10 transition-colors group">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded">{stat.change}</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                                <p className="text-sm text-white/40 font-medium">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Status */}
                <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Cpu size={18} className="text-primary" />
                            System Status
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            OPERATIONAL
                        </div>
                    </div>

                    {/* Simulated Terminal Log */}
                    <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-slate-400 h-64 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                        <div className="space-y-1">
                            <p><span className="text-green-400">[14:20:01]</span> Kernel loaded successfully.</p>
                            <p><span className="text-green-400">[14:20:02]</span> Initialized generic graphics acceleration.</p>
                            <p><span className="text-blue-400">[14:20:05]</span> Connecting to AdminContext...</p>
                            <p><span className="text-yellow-400">[14:20:06]</span> Fetching mock data from localStorage.</p>
                            <p><span className="text-green-400">[14:20:06]</span> Data synced: {data.projects.length} Projects found.</p>
                            <p><span className="text-green-400">[14:20:06]</span> Data synced: {data.skills.length} Skill categories found.</p>
                            <p><span className="text-purple-400">[14:21:45]</span> New session started from 192.168.1.1</p>
                            <p className="animate-pulse">_</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Recent Activity */}
                <div className="bg-white/5 border border-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                        <ShieldCheck size={18} className="text-green-400" />
                        Security Log
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex gap-3 items-center p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                                    AU
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">Auth Check Passed</p>
                                    <p className="text-xs text-white/40">2 mins ago • IP 127.0.0.1</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
