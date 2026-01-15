"use client";

import { useOS, WindowId } from "@/context/OSContext";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Folder, Terminal, Trophy, User, Mail, Github, Linkedin, Briefcase, Settings } from "lucide-react";

export function Dock() {
    const { openWindow, windows } = useOS();

    // Dock items configuration with specific gradients from the template
    const dockItems: { id: WindowId; icon: any; label: string; gradient: string }[] = [
        { id: "about", icon: User, label: "About Me", gradient: "bg-gradient-to-br from-blue-400 to-blue-600" },
        { id: "projects", icon: Folder, label: "Projects", gradient: "bg-gradient-to-br from-sky-300 to-sky-500" },
        { id: "achievements", icon: Trophy, label: "Achievements", gradient: "bg-gradient-to-br from-yellow-400 to-orange-500" },
        { id: "terminal", icon: Terminal, label: "Terminal", gradient: "bg-gradient-to-br from-gray-700 to-gray-900" },
        { id: "contact", icon: Mail, label: "Contact", gradient: "bg-gradient-to-br from-purple-500 to-indigo-600" },
        { id: "music", icon: SpotifyLogo, label: "Music", gradient: "bg-gradient-to-br from-green-500 to-green-700" },
    ];

    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 h-auto px-4 py-3 flex items-end gap-3 md:gap-4 z-50 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        >
            {dockItems.map((item) => (
                <DockIcon
                    key={item.id}
                    mouseX={mouseX}
                    icon={item.icon}
                    label={item.label}
                    gradient={item.gradient}
                    onClick={() => openWindow(item.id)}
                    isOpen={windows[item.id].isOpen && !windows[item.id].isMinimized}
                />
            ))}

            {/* Separator */}
            <div className="w-px h-10 bg-white/10 mx-1 mb-2" />

            {/* Settings (Mock for now, or opens a modal) */}
            <DockIcon
                mouseX={mouseX}
                icon={Settings}
                label="Settings"
                gradient="bg-gradient-to-br from-slate-500 to-slate-600"
                onClick={() => { }} // Placeholder
                isOpen={false}
            />
        </motion.div>
    );
}

function DockIcon({
    mouseX,
    icon: Icon,
    label,
    gradient,
    onClick,
    isOpen,
}: {
    mouseX: MotionValue;
    icon: any;
    label: string;
    gradient: string;
    onClick: () => void;
    isOpen?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]); // Base size 48px to max 80px (template uses size-12 to size-14 which is 48px to 56px, but zoom effect is nicer with larger range)
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <div className="relative group flex flex-col items-center gap-2">
            {/* Tooltip */}
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#101e22]/90 text-white text-[10px] font-medium px-2 py-1 rounded border border-white/10 backdrop-blur-sm shadow-xl pointer-events-none whitespace-nowrap z-50">
                {label}
            </div>

            <motion.div
                ref={ref}
                style={{ width, height: width }} // maintain aspect ratio
                onClick={onClick}
                className={`rounded-xl flex items-center justify-center shadow-lg cursor-pointer border border-white/20 relative z-10 ${gradient}`}
            >
                {/* Terminal Prompt Indicator Special Case */}
                {label === "Terminal" && (
                    <span className="absolute top-2 left-2 text-[10px] text-white/50 font-mono select-none">&gt;_</span>
                )}
                <Icon size={width.get() ? width.get() * 0.5 : 24} className="text-white relative z-20 pointer-events-none" style={{ width: "50%", height: "50%" }} />
            </motion.div>

            {/* Active Indicator */}
            <div className={`w-1 h-1 rounded-full ${isOpen ? 'bg-white/80' : 'bg-transparent'} mb-1 transition-colors`} />
        </div>
    );
}

function SpotifyLogo({ size = 24, className, style }: { size?: number, className?: string, style?: any }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} style={style}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.6 1.44.6.24.84.9.6 1.5-.3.602-.96.841-1.62.54z" />
        </svg>
    )
}
