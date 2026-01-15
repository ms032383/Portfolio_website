"use client";

import { education, experiences, personalInfo, skills } from "@/lib/data";
import { User, Briefcase, GraduationCap, Code, Globe, Mail, MapPin, Award } from "lucide-react";
import { useRef, useState } from "react";

export function FinderContent() {
    const sectionRefs = {
        overview: useRef<HTMLDivElement>(null),
        experience: useRef<HTMLDivElement>(null),
        education: useRef<HTMLDivElement>(null),
        skills: useRef<HTMLDivElement>(null),
    };

    const scrollToSection = (section: keyof typeof sectionRefs) => {
        sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex h-full text-white bg-gradient-to-br from-[#101e23] to-[#0d181c]">
            {/* Sidebar Navigation */}
            <nav className="w-64 bg-[#0a1417]/50 border-r border-[#ffffff10] flex flex-col p-4 gap-2 shrink-0 hidden md:flex">
                <div className="mb-4 px-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Locations</div>

                <SidebarButton icon={User} label="Overview" onClick={() => scrollToSection("overview")} active />
                <SidebarButton icon={Briefcase} label="Experience" onClick={() => scrollToSection("experience")} />
                <SidebarButton icon={GraduationCap} label="Education" onClick={() => scrollToSection("education")} />
                <SidebarButton icon={Code} label="Skills" onClick={() => scrollToSection("skills")} />

                <div className="mt-auto pt-4 border-t border-[#ffffff10]">
                    <div className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Socials</div>
                    <div className="flex gap-2 px-2">
                        <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer border border-white/5">
                            <Globe size={14} />
                        </a>
                        <a href={personalInfo.socials.email} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer border border-white/5">
                            <Mail size={14} />
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto scroll-smooth p-6 md:p-8 space-y-12 no-scrollbar">

                {/* Hero / Header Section */}
                <section ref={sectionRefs.overview} className="flex flex-col md:flex-row gap-6 items-start animate-[fade-in_0.6s_ease-out]">
                    <div className="relative shrink-0">
                        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-purple-500 shadow-[0_0_30px_rgba(13,185,242,0.3)]">
                            <div className="w-full h-full rounded-full bg-[#101e23] flex items-center justify-center overflow-hidden border-4 border-[#101e23]">
                                <span className="text-4xl">🧑‍💻</span>
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-[#101e23] rounded-full p-1.5 border border-white/10">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center pt-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">{personalInfo.name}</h1>
                        <p className="text-primary font-mono text-sm mb-4 flex items-center gap-2">
                            <span className="bg-primary/10 px-2 py-0.5 rounded text-primary border border-primary/20">{personalInfo.title}</span>
                        </p>
                        <div className="flex flex-wrap gap-2 text-white/40 text-sm">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {personalInfo.location}</span>
                        </div>
                    </div>
                </section>

                {/* Bio Section */}
                <section className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-md">
                    <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <User size={18} className="text-primary" />
                        Bio
                    </h2>
                    <p className="text-slate-300 leading-relaxed font-light text-sm">
                        {personalInfo.tagline} Experienced in building full-stack applications with modern technologies. Passionate about clean code, UI/UX design, and solving complex problems.
                    </p>
                </section>

                {/* Experience Timeline */}
                <section ref={sectionRefs.experience}>
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Briefcase size={18} className="text-primary" />
                        Experience
                    </h2>
                    <div className="relative pl-2">
                        {/* Vertical Line */}
                        <div className="absolute left-[19px] top-2 bottom-4 w-[2px] bg-gradient-to-b from-primary/50 to-transparent"></div>

                        {experiences.map((exp, index) => (
                            <div key={exp.id} className="relative flex gap-6 pb-10 group last:pb-2">
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full bg-[#101e23] border-2 flex items-center justify-center shadow-[0_0_15px_rgba(13,185,242,0.3)] transition-all duration-300 ${index === 0 ? 'border-primary scale-110' : 'border-slate-600 group-hover:border-primary'}`}>
                                        <Briefcase size={16} className={index === 0 ? "text-primary" : "text-slate-400 group-hover:text-primary"} />
                                    </div>
                                </div>
                                <div className="flex-1 bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-colors hover:bg-white/[0.04]">
                                    <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                                        <h3 className="text-white font-medium text-lg">{exp.company}</h3>
                                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-[#90bccb] text-sm mb-3">{exp.role}</p>
                                    <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                                        {exp.points.map((pt, i) => (
                                            <li key={i}>{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section ref={sectionRefs.education}>
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <GraduationCap size={18} className="text-primary" />
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id} className="bg-white/5 rounded-xl p-0 border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
                                <div className="flex items-start gap-4 p-5">
                                    <div className="w-12 h-12 rounded bg-[#1e293b] flex items-center justify-center shrink-0 border border-white/10">
                                        <GraduationCap size={24} className="text-white/60" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-white font-medium">{edu.school}</h3>
                                            <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{edu.year}</span>
                                        </div>
                                        <p className="text-slate-400 text-sm mb-2">{edu.degree}</p>
                                        <p className="text-slate-500 text-xs font-mono">{edu.grade}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section ref={sectionRefs.skills}>
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Code size={18} className="text-primary" />
                        Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map(cat => (
                            <div key={cat.category} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-colors">
                                <h4 className="font-bold mb-3 text-primary/80 text-xs uppercase tracking-wider">{cat.category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map(item => (
                                        <span key={item} className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-md text-xs text-slate-300 transition-colors cursor-default">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="h-10"></div> {/* Spacer */}
            </main>
        </div>
    );
}

function SidebarButton({ icon: Icon, label, onClick, active }: { icon: any, label: string, onClick: () => void, active?: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${active ? "bg-primary/20 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
        >
            <Icon size={18} className={active ? "text-primary" : ""} />
            <span className="text-sm font-medium">{label}</span>
        </button>
    )
}
