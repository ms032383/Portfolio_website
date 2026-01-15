"use client";

import { useState, useRef, useEffect } from "react";
import { personalInfo, skills } from "@/lib/data";

interface CommandHistory {
    cmd: string;
    output: React.ReactNode;
}

export function TerminalApp() {
    const [history, setHistory] = useState<CommandHistory[]>([
        { cmd: "init", output: "MohanOS Kernel v1.0.4 loaded. System Ready." },
        { cmd: "help", output: "Type 'help' to see available commands." }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        let output: React.ReactNode = "";

        switch (cmd) {
            case "help":
                output = (
                    <div className="space-y-1 text-slate-300">
                        <p>Available commands:</p>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span className="text-yellow-400">about</span> <span>View info about Mohan</span>
                            <span className="text-yellow-400">skills</span> <span>List technical skills</span>
                            <span className="text-yellow-400">contact</span> <span>Show contact details</span>
                            <span className="text-yellow-400">clear</span> <span>Clear terminal</span>
                            <span className="text-yellow-400">sudo</span> <span>???</span>
                        </div>
                    </div>
                );
                break;
            case "about":
                output = (
                    <div className="text-cyan-300">
                        <p>NAME: {personalInfo.name}</p>
                        <p>ROLE: {personalInfo.title}</p>
                        <p>BIO: {personalInfo.tagline}</p>
                    </div>
                );
                break;
            case "skills":
                output = (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map(s => (
                            <div key={s.category}>
                                <span className="text-purple-400 font-bold uppercase tracking-wider">[{s.category}]</span>
                                <div className="text-slate-300 ml-4">
                                    {s.items.map(i => <span key={i} className="inline-block mr-2">• {i}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                );
                break;
            case "contact":
                output = (
                    <div className="text-slate-300">
                        <p>EMAIL: <a href={personalInfo.socials.email} className="text-blue-400 underline">{personalInfo.email}</a></p>
                        <p>GITHUB: <a href={personalInfo.socials.github} className="text-blue-400 underline" target="_blank">github.com/ms032383</a></p>
                        <p>LINKEDIN: <a href={personalInfo.socials.linkedin} className="text-blue-400 underline" target="_blank">linkedin.com/in/mohansingh007</a></p>
                    </div>
                )
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            case "sudo":
                output = <span className="text-red-500 font-bold">PERMISSION DENIED. YOU ARE NOT ROOT.</span>;
                break;
            default:
                output = <span className="text-red-400">Command not found: '{cmd}'.</span>;
        }

        setHistory(prev => [...prev, { cmd: input, output }]);
        setInput("");
    };

    return (
        <div
            className="h-full bg-[#090a0c] text-[#a9b7c6] font-mono text-sm flex flex-col relative overflow-hidden selection:bg-white/20"
            onClick={() => document.getElementById("terminal-input")?.focus()}
        >
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative z-0" ref={scrollRef}>
                {history.map((entry, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex gap-2">
                            <span className="text-green-500 font-bold">visitor@mohan-os</span>
                            <span className="text-white/50">:</span>
                            <span className="text-blue-400">~</span>
                            <span className="text-white/50">$</span>
                            <span className="text-white ml-2">{entry.cmd}</span>
                        </div>
                        <div className="pl-4 border-l-2 border-white/5">{entry.output}</div>
                    </div>
                ))}

                <form onSubmit={handleCommand} className="flex gap-2 pt-2">
                    <div className="flex gap-2 shrink-0">
                        <span className="text-green-500 font-bold">visitor@mohan-os</span>
                        <span className="text-white/50">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white/50">$</span>
                    </div>
                    <input
                        id="terminal-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-white border-none p-0 focus:ring-0 caret-white"
                        autoFocus
                        autoComplete="off"
                        spellCheck={false}
                    />
                </form>
            </div>
        </div>
    );
}
