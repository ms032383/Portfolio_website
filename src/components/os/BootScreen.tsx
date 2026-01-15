"use client";

import { useOS } from "@/context/OSContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function BootScreen() {
    const { bootState, setBootState } = useOS();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (bootState !== "booting") return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setBootState("desktop"), 800);
                    return 100;
                }
                return prev + Math.random() * 8; // Slightly varied speed
            });
        }, 150);

        return () => clearInterval(interval);
    }, [bootState, setBootState]);

    return (
        <AnimatePresence>
            {bootState === "booting" && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-background-dark min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-display"
                >
                    {/* Subtle Background Grid/Texture */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#0db9f2_1px,transparent_1px)] [background-size:32px_32px]"
                    />

                    {/* Main Boot Container */}
                    <div className="relative z-10 w-full max-w-[480px] px-8 flex flex-col gap-12">
                        {/* Logo Section */}
                        <div className="flex flex-col items-center justify-center">
                            <motion.div
                                className="relative group"
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* Glow behind logo */}
                                <div className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl opacity-50" />

                                {/* Logo Icon */}
                                <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-md shadow-[0_0_50px_-12px_rgba(13,185,242,0.5)]">
                                    <span className="material-symbols-outlined text-[48px] text-white/90 drop-shadow-[0_0_15px_rgba(13,185,242,0.8)]">terminal</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Progress Section */}
                        <div className="flex flex-col gap-4 w-full">
                            {/* Progress Bar */}
                            <div className="rounded-full bg-white/5 border border-white/10 p-[2px] shadow-inner overflow-hidden">
                                <div className="h-1.5 rounded-full bg-primary relative overflow-hidden" style={{ width: `${progress}%` }}>
                                    {/* Shimmer animation inside bar */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </div>

                            {/* Meta / Status Text */}
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-primary text-sm font-mono font-medium leading-normal tracking-wide flex items-center">
                                    <span className="material-symbols-outlined text-[14px] mr-2 animate-spin">sync</span>
                                    {progress < 100 ? "Initializing kernel..." : "System Ready"}
                                </p>
                                <p className="text-white/40 text-[10px] font-mono font-normal text-center">
                                    Loading modules: <span className="text-white/60">graphics_driver</span>, <span className="text-white/60">network_stack</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer System Info */}
                    <div className="absolute bottom-6 w-full text-center z-10">
                        <p className="text-white/20 text-[10px] font-mono tracking-[0.2em] uppercase">MOHAN_OS // V.1.0.4 // SECURE_BOOT</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
