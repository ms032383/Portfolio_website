"use client";

import { useOS } from "@/context/OSContext";
import { useState, useEffect } from "react";
import { Battery, Wifi, Zap, Github, Linkedin, Mail, Settings } from "lucide-react";

export function MenuBar() {
    const { openWindow } = useOS();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-10 px-4 flex items-center justify-between bg-[#101e22]/65 backdrop-blur-md border-b border-white/5 rounded-b-lg mx-2 mt-1 select-none shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            {/* Left Section: System & Navigation */}
            <div className="flex items-center gap-5">
                <button
                    className="flex items-center justify-center text-white hover:text-primary transition-colors"
                    onClick={() => openWindow("about")}
                >
                    <Zap size={18} fill="currentColor" className="text-white" />
                </button>
                <div className="flex items-center gap-6 text-sm font-medium text-white">
                    <span className="font-bold tracking-wide hidden sm:inline-block">Mohan Singh</span>
                    <nav className="hidden md:flex items-center gap-5 text-gray-300">
                        <button onClick={() => openWindow("about")} className="hover:text-white transition-colors hover:bg-white/10 px-2 py-0.5 rounded">Home</button>
                        <button onClick={() => openWindow("projects")} className="hover:text-white transition-colors hover:bg-white/10 px-2 py-0.5 rounded">Projects</button>
                        <button onClick={() => openWindow("achievements")} className="hover:text-white transition-colors hover:bg-white/10 px-2 py-0.5 rounded">Achievements</button>
                        <button onClick={() => openWindow("contact")} className="hover:text-white transition-colors hover:bg-white/10 px-2 py-0.5 rounded">Contact</button>
                    </nav>
                </div>
            </div>

            {/* Right Section: Status & Controls */}
            <div className="flex items-center gap-4">
                {/* Social Icons (Desktop only) */}
                <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-white/10">
                    <a aria-label="Github" className="text-gray-300 hover:text-white transition-colors p-1" href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                    </a>
                    <a aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors p-1" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin size={16} />
                    </a>
                    <a aria-label="Email" className="text-gray-300 hover:text-white transition-colors p-1" href="mailto:mohan@example.com">
                        <Mail size={16} />
                    </a>
                </div>

                {/* CTA */}
                <button
                    onClick={() => openWindow("contact")}
                    className="bg-primary/90 hover:bg-primary text-[#0f1115] text-xs font-bold px-3 py-1.5 rounded-md shadow-[0_0_10px_rgba(10,186,245,0.4)] transition-all transform active:scale-95"
                >
                    Hire Me
                </button>

                {/* System Status */}
                <div className="flex items-center gap-3 pl-2 text-xs font-medium text-gray-200 cursor-default">
                    {/* Clock */}
                    <span className="font-mono min-w-[60px] text-center">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {/* Battery */}
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] hidden sm:inline">100%</span>
                        <Battery size={16} className="text-green-400 rotate-90" />
                    </div>

                    {/* Wifi */}
                    <Wifi size={16} />

                    {/* Control Center Toggle */}
                    <button className="hover:bg-white/10 rounded p-0.5">
                        <Settings size={16} />
                    </button>
                </div>
            </div>
        </header>
    );
}
