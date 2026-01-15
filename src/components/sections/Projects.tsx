"use client";

import { projects } from "@/lib/data";
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Section } from "@/components/ui/Section";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image"; // Placeholder usage
import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Mobile", "Web"] as const;

export function Projects() {
    const [filter, setFilter] = useState<typeof categories[number]>("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = projects.filter(
        (p) => filter === "All" || p.category === filter || p.category === "All" // 'All' category projects show in both
    );

    return (
        <Section id="projects" className="relative">
            <div className="flex flex-col gap-4 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                    Projects
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>

            {/* Filter */}
            <div className="flex justify-center gap-2 mb-12 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? "bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card
                                className="group cursor-pointer h-full flex flex-col hover:border-primary/50 transition-colors"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="aspect-video w-full bg-white/5 rounded-lg mb-4 overflow-hidden relative border border-white/5">
                                    {/* Placeholder for project image - In real implementation, use next/image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20 group-hover:scale-105 transition-transform duration-500">
                                        <Layers size={48} />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="flex gap-2">
                                            {project.techStack.slice(0, 3).map(tech => (
                                                <span key={tech} className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/80 border border-white/10">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/80 border border-white/10">
                                                    +{project.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/60 text-sm line-clamp-2 mb-4 flex-1">
                                        {project.description}
                                    </p>
                                    <div className="text-accent text-sm font-medium flex items-center gap-1">
                                        View Details <ExternalLink size={14} />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Details Modal */}
            <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
                {selectedProject && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="aspect-video bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                            {/* Full size image placeholder */}
                            <Layers size={64} className="text-white/20" />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map(tech => (
                                        <span key={tech} className="text-xs px-3 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/20">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="text-white/70 leading-relaxed text-lg">
                                {selectedProject.description}
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <Link href={selectedProject.liveLink || "#"} target="_blank" className="flex-1">
                                    <Button className="w-full">
                                        Live Demo <ExternalLink size={16} className="ml-2" />
                                    </Button>
                                </Link>
                                <Link href={selectedProject.githubLink || "#"} target="_blank" className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        Source Code <Github size={16} className="ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </Section>
    );
}
