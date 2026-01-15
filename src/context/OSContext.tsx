"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type WindowId = "about" | "projects" | "achievements" | "terminal" | "contact" | "music";

export interface WindowState {
    id: WindowId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

interface OSContextType {
    bootState: "booting" | "login" | "desktop";
    setBootState: (state: "booting" | "login" | "desktop") => void;
    windows: Record<WindowId, WindowState>;
    openWindow: (id: WindowId) => void;
    closeWindow: (id: WindowId) => void;
    minimizeWindow: (id: WindowId) => void;
    maximizeWindow: (id: WindowId) => void;
    focusWindow: (id: WindowId) => void;
    toggleWindow: (id: WindowId) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

const initialWindows: Record<WindowId, WindowState> = {
    about: { id: "about", title: "About Me", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    projects: { id: "projects", title: "Projects Explorer", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    achievements: { id: "achievements", title: "Achievements", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    terminal: { id: "terminal", title: "Terminal", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    contact: { id: "contact", title: "Contact", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    music: { id: "music", title: "Music Player", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
};

export function OSProvider({ children }: { children: ReactNode }) {
    const [bootState, setBootState] = useState<"booting" | "login" | "desktop">("booting");
    const [windows, setWindows] = useState<Record<WindowId, WindowState>>(initialWindows);
    const [zIndexCounter, setZIndexCounter] = useState(10);

    const focusWindow = (id: WindowId) => {
        setZIndexCounter((prev) => prev + 1);
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], zIndex: zIndexCounter + 1, isMinimized: false },
        }));
    };

    const openWindow = (id: WindowId) => {
        setWindows((prev) => {
            const isOpen = prev[id].isOpen;
            if (isOpen && !prev[id].isMinimized) {
                // Already open and focussed? just focus
                return prev;
            }
            return {
                ...prev,
                [id]: { ...prev[id], isOpen: true, isMinimized: false },
            };
        });
        focusWindow(id);
    };

    const closeWindow = (id: WindowId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false, isMaximized: false, isMinimized: false },
        }));
    };

    const minimizeWindow = (id: WindowId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMinimized: true },
        }));
    };

    const maximizeWindow = (id: WindowId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
        }));
        focusWindow(id);
    };

    const toggleWindow = (id: WindowId) => {
        const win = windows[id];
        if (win.isOpen && !win.isMinimized) {
            minimizeWindow(id);
        } else {
            openWindow(id);
        }
    }

    return (
        <OSContext.Provider
            value={{
                bootState,
                setBootState,
                windows,
                openWindow,
                closeWindow,
                focusWindow,
                minimizeWindow,
                maximizeWindow,
                toggleWindow
            }}
        >
            {children}
        </OSContext.Provider>
    );
}

export function useOS() {
    const context = useContext(OSContext);
    if (context === undefined) {
        throw new Error("useOS must be used within an OSProvider");
    }
    return context;
}
