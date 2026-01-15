"use client";

import { adminDataService } from "@/lib/adminData";
import { Folder, ArrowLeft, Globe, Github, X, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Project } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectsExplorer() {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await adminDataService.getData();
            setProjects(data.projects);
        };
        fetchProjects();
    }, []);

    return (
        <div className="h-full bg-gradient-to-br from-[#1e1e2e] to-[#151520] relative overflow-hidden font-sans text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

            <AnimatePresence mode="wait">
                {activeProject ? (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="h-full flex flex-col"
                    >
                        {/* Toolbar */}
                        <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-4 shrink-0 backdrop-blur-md z-10">
                            <button
                                onClick={() => setActiveProject(null)}
                                className="hover:bg-white/10 p-2 rounded-full transition-colors group"
                            >
                                <ArrowLeft size={18} className="text-white/70 group-hover:text-white" />
                            </button>
                            <div className="h-6 w-px bg-white/10"></div>
                            <span className="text-sm font-medium text-white/80 tracking-wide">{activeProject.title}</span>
                        </div>

                        {/* Project Detail Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10">
                            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
                                {/* Left: Preview / Hero */}
                                <div className="w-full md:w-1/2">
                                    <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0f1115] relative group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
                                                {activeProject.image !== "/images/graph-path.png" && activeProject.image !== "/images/ecommerce.png" && activeProject.image !== "/images/coalsafe.png" ? <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" /> : "🚀"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Links Mobile/Desktop layout adjustment */}
                                    <div className="flex gap-4 mt-6">
                                        <a href={activeProject.liveLink} target="_blank" className="flex-1 bg-primary hover:bg-primary/90 text-[#0f1115] py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(13,185,242,0.3)] hover:shadow-[0_0_30px_rgba(13,185,242,0.5)]">
                                            <Globe size={18} /> Live Demo
                                        </a>
                                        <a href={activeProject.githubLink} target="_blank" className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all border border-white/10 backdrop-blur-md">
                                            <Github size={18} /> Source Code
                                        </a>
                                    </div>
                                </div>

                                {/* Right: Details */}
                                <div className="flex-1 space-y-8">
                                    <div>
                                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">{activeProject.title}</h1>
                                        <p className="text-primary font-mono text-sm">{activeProject.category || "Full Stack"}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider">Description</h3>
                                        <p className="text-white/80 leading-relaxed text-lg font-light">
                                            {activeProject.description}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider">Tech Stack</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {activeProject.techStack.map(tech => (
                                                <span key={tech} className="px-3 py-1.5 rounded-md bg-white/5 text-slate-300 text-sm border border-white/10 hover:border-primary/30 transition-colors cursor-default">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col p-6"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-1">Projects</h1>
                                <p className="text-white/40 text-sm">Explore my latest work</p>
                            </div>
                            <span className="text-xs font-mono text-white/30">{projects.length} ITEMS</span>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    onClick={() => setActiveProject(project)}
                                    className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <Folder size={64} className="text-blue-400 drop-shadow-lg relative z-10 transition-transform group-hover:scale-105" fill="currentColor" fillOpacity={0.4} />
                                        {/* Project Type Badge */}
                                        <div className="absolute -bottom-1 -right-2 bg-[#1e1e2e] rounded text-[10px] font-bold px-1.5 py-0.5 border border-white/10 shadow-sm z-20 text-white/70">
                                            JS
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-white/90 text-center group-hover:text-primary transition-colors line-clamp-2 mt-2">
                                        {project.title}
                                    </span>
                                </div>
                            ))}

                            {/* Empty State / Ghost Items for visual balance */}
                            {[1, 2].map(i => (
                                <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/5 opacity-20 pointer-events-none grayscale">
                                    <Folder size={64} className="text-gray-500" fill="currentColor" />
                                    <div className="h-4 w-20 bg-white/20 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
