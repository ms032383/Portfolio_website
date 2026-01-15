import { personalInfo } from "@/lib/data";
import { Link2, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-12 bg-black border-t border-white/5 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold font-mono text-white mb-2">
                        Mohan Singh
                    </h2>
                    <p className="text-white/50 text-sm">
                        &copy; {new Date().getFullYear()} Building the future, one commit at a time.
                    </p>
                </div>

                <div className="flex gap-6">
                    <Link
                        href={personalInfo.socials.linkedin}
                        target="_blank"
                        className="text-white/50 hover:text-primary transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10"
                    >
                        <Linkedin size={20} />
                    </Link>
                    <Link
                        href={personalInfo.socials.github}
                        target="_blank"
                        className="text-white/50 hover:text-accent transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10"
                    >
                        <Github size={20} />
                    </Link>
                    <Link
                        href={personalInfo.socials.email}
                        className="text-white/50 hover:text-white transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10"
                    >
                        <Mail size={20} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
