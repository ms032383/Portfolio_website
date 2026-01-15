"use client";

import { useAdmin } from "@/context/AdminContext";
import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Globe, Github, Image as ImageIcon, X } from "lucide-react";
import { Project } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export function Repository() {
    const { data, addProject, updateProject, deleteProject } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [search, setSearch] = useState("");

    const filteredProjects = data.projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const newProject = {
            title: "New Project",
            description: "",
            techStack: [],
            liveLink: "#",
            githubLink: "#",
            image: "/images/project-placeholder.jpg",
            category: "Web",
            ...editingProject
        } as Project;

        if (editingProject?.id) {
            await updateProject(newProject);
        } else {
            await addProject(newProject);
        }

        setIsModalOpen(false);
        setEditingProject(null);
    };

    const openModal = (project?: Project) => {
        setEditingProject(project || {});
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-xl">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                        type="text"
                        placeholder="Search repository..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    New Project
                </button>
            </div>

            {/* List */}
            <div className="bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 border-b border-white/5 text-xs font-bold text-white/40 uppercase tracking-wider">
                    <span className="w-12">Image</span>
                    <span>Project Name</span>
                    <span>Tech Stack</span>
                    <span className="text-right">Actions</span>
                </div>
                <div className="divide-y divide-white/5">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                            <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/10 overflow-hidden flex items-center justify-center">
                                {project.image && project.image !== "/images/project-placeholder.jpg" ? (
                                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <ImageIcon size={20} className="text-white/20" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-white font-medium">{project.title}</h3>
                                <p className="text-xs text-white/40 mt-1 line-clamp-1">{project.description}</p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {project.techStack.slice(0, 3).map(tech => (
                                    <span key={tech} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-white/60">
                                        {tech}
                                    </span>
                                ))}
                                {project.techStack.length > 3 && (
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xs text-white/60">+{project.techStack.length - 3}</span>
                                )}
                            </div>
                            <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openModal(project)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredProjects.length === 0 && (
                        <div className="p-12 text-center text-white/30 text-sm">No projects found in the repository.</div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-[#18181b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h2 className="text-xl font-bold text-white">
                                    {editingProject?.id ? "Edit Project" : "New Project"}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase block mb-1">Project Name</label>
                                    <input
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none"
                                        required
                                        value={editingProject?.title || ""}
                                        onChange={e => setEditingProject(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="e.g. My Awesome App"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-white/40 uppercase block mb-1">Live Link</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                            <input
                                                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white focus:border-primary/50 outline-none"
                                                value={editingProject?.liveLink || ""}
                                                onChange={e => setEditingProject(prev => ({ ...prev, liveLink: e.target.value }))}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-white/40 uppercase block mb-1">GitHub Link</label>
                                        <div className="relative">
                                            <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                            <input
                                                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-3 text-white focus:border-primary/50 outline-none"
                                                value={editingProject?.githubLink || ""}
                                                onChange={e => setEditingProject(prev => ({ ...prev, githubLink: e.target.value }))}
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase block mb-1">Description</label>
                                    <textarea
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none min-h-[100px]"
                                        value={editingProject?.description || ""}
                                        onChange={e => setEditingProject(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Brief description of the project..."
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/40 uppercase block mb-1">Tech Stack (comma separated)</label>
                                    <input
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none font-mono text-sm"
                                        value={editingProject?.techStack?.join(", ") || ""}
                                        onChange={e => setEditingProject(prev => ({ ...prev, techStack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
                                        placeholder="React, TypeScript, Tailwind..."
                                    />
                                </div>
                            </form>

                            <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
