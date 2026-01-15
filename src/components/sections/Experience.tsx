"use client";

import { experiences } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export function Experience() {
    return (
        <Section id=" تجربه" className="relative"> {/* Typo in ID meant 'experience', fixing to english 'experience' in logic below but using prompt's section naming loosely */}
            <div id="experience" className="absolute -top-20" /> {/* Anchor adjustment */}

            <div className="flex flex-col gap-4 mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                    Experience
                </h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>

            <div className="relative max-w-4xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-1/2 ml-6 md:ml-0" />

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 top-0 w-12 h-12 flex items-center justify-center -translate-x-[2px] md:-translate-x-1/2 z-10">
                                <div className="w-4 h-4 bg-black border-2 border-accent rounded-full shadow-[0_0_10px_rgba(0,255,157,0.5)]" />
                            </div>

                            {/* Date (Desktop) */}
                            <div className={`hidden md:block w-1/2 pt-2 ${index % 2 === 0 ? "text-left pl-12" : "text-right pr-12"}`}>
                                <span className="text-accent font-mono text-sm tracking-widest uppercase">
                                    {exp.startDate} - {exp.endDate}
                                </span>
                            </div>

                            {/* Card */}
                            <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                <Card gradient className={`md:mx-8 ${index % 2 === 0 ? "md:mr-0" : "md:ml-0"}`}>
                                    <div className="flex flex-col gap-2 mb-4">
                                        <div className="md:hidden text-accent font-mono text-xs tracking-widest uppercase mb-1">
                                            {exp.startDate} - {exp.endDate}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                        <div className="flex items-center gap-2 text-primary font-medium">
                                            <Briefcase size={16} />
                                            {exp.company}
                                        </div>
                                    </div>
                                    <ul className="space-y-2">
                                        {exp.points.map((point, i) => (
                                            <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
