"use client";

import { useOS } from "@/context/OSContext";
import { BootScreen } from "./os/BootScreen";
import { MenuBar } from "./os/MenuBar";
import { Dock } from "./os/Dock";
import { WindowFrame } from "./os/WindowFrame";
import { FinderContent } from "./apps/Finder";
import { ProjectsExplorer } from "./apps/ProjectsExplorer";
import { TerminalApp } from "./apps/Terminal";
import { AchievementsContent } from "./apps/Achievements";
import { ContactContent } from "./apps/Contact";
import { MusicPlayer } from "./apps/MusicPlayer";

export function DesktopEnv() {
    const { bootState } = useOS();

    return (
        <div className="h-screen w-screen overflow-hidden bg-black relative font-sans select-none">
            {/* Boot Screen Overlay */}
            <BootScreen />

            {/* Desktop Environment */}
            {bootState === "desktop" && (
                <div
                    className="absolute inset-0 bg-cover bg-center animate-fade-in"
                    style={{ backgroundImage: "url('/images/macos-wallpaper.jpg')", backgroundColor: "#0f0f12" }}
                >
                    {/* Abstract Background fallback if image missing */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e2e] via-[#000000] to-[#11111b] -z-10" />
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent pointer-events-none" />

                    <MenuBar />

                    {/* Windows Layer */}
                    <div className="absolute inset-0 top-8 bottom-20 pointer-events-none">
                        <div className="pointer-events-auto w-full h-full relative">
                            <WindowFrame id="about" initialPosition={{ x: 50, y: 50 }}>
                                <FinderContent />
                            </WindowFrame>

                            <WindowFrame id="projects" initialPosition={{ x: 100, y: 80 }}>
                                <ProjectsExplorer />
                            </WindowFrame>

                            <WindowFrame id="terminal" initialPosition={{ x: 150, y: 150 }}>
                                <TerminalApp />
                            </WindowFrame>

                            <WindowFrame id="achievements" initialPosition={{ x: 200, y: 100 }}>
                                <AchievementsContent />
                            </WindowFrame>

                            <WindowFrame id="contact" initialPosition={{ x: 300, y: 120 }}>
                                <ContactContent />
                            </WindowFrame>

                            <WindowFrame id="music" initialPosition={{ x: 350, y: 150 }}>
                                <div className="h-full w-full">
                                    <MusicPlayer />
                                </div>
                            </WindowFrame>
                        </div>
                    </div>

                    <Dock />
                </div>
            )}
        </div>
    );
}
