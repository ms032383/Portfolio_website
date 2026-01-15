"use client";

import { useOS, WindowId } from "@/context/OSContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Maximize2 } from "lucide-react";
import { ReactNode, useRef } from "react";

interface WindowFrameProps {
    id: WindowId;
    children: ReactNode;
    initialPosition?: { x: number; y: number };
}

export function WindowFrame({ id, children, initialPosition = { x: 0, y: 0 } }: WindowFrameProps) {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useOS();
    const windowState = windows[id];
    const constraintsRef = useRef(null);

    if (!windowState.isOpen) return null;

    return (
        <AnimatePresence>
            {!windowState.isMinimized && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: initialPosition.x, y: initialPosition.y }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: windowState.isMaximized ? 0 : initialPosition.x,
                        y: windowState.isMaximized ? 0 : initialPosition.y,
                        width: windowState.isMaximized ? "100%" : "60vw",
                        height: windowState.isMaximized ? "calc(100vh - 2rem)" : "60vh",
                        top: windowState.isMaximized ? "2rem" : "auto", // Below menubar
                        left: windowState.isMaximized ? 0 : "auto",
                        borderRadius: windowState.isMaximized ? 0 : "12px",
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    drag={!windowState.isMaximized}
                    dragMomentum={false}
                    onDragStart={() => focusWindow(id)}
                    onMouseDown={() => focusWindow(id)}
                    style={{ zIndex: windowState.zIndex }}
                    className="fixed bg-[#1e1e2e]/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Title Bar */}
                    <div
                        className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 justify-between select-none cursor-default"
                        onDoubleClick={() => maximizeWindow(id)}
                    >
                        <div className="flex gap-2 group">
                            <button
                                onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-black/50 overflow-hidden"
                            >
                                <X size={8} className="opacity-0 group-hover:opacity-100" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-black/50 overflow-hidden"
                            >
                                <Minus size={8} className="opacity-0 group-hover:opacity-100" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-black/50 overflow-hidden"
                            >
                                <Maximize2 size={8} className="opacity-0 group-hover:opacity-100" />
                            </button>
                        </div>

                        <span className="text-white/60 text-xs font-medium font-mono">{windowState.title}</span>
                        <div className="w-12" /> {/* Spacer for centering */}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-auto custom-scrollbar p-6">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
