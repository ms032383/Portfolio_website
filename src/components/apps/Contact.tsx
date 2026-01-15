"use client";

import { useOS } from "@/context/OSContext";
import { useState } from "react";
import { Send, Loader2, CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function ContactContent() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        // Mock send
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus("success");
        setTimeout(() => {
            setStatus("idle");
            setFormState({ name: "", email: "", message: "" });
        }, 3000);
    };

    if (status === "success") {
        return (
            <div className="h-full bg-gradient-to-br from-[#1e1e2e] to-[#252535] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]"></div>
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-[scale-in_0.3s_ease-out]">
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Message Sent!</h2>
                <p className="text-white/60 text-lg">I'll get back to you shortly.</p>
            </div>
        )
    }

    return (
        <div className="h-full bg-gradient-to-br from-[#121212] to-[#1e1e2e] flex flex-col md:flex-row">
            {/* Contact Info Sidebar (Desktop) / Header (Mobile) */}
            <div className="bg-white/5 border-b md:border-b-0 md:border-r border-white/5 p-6 md:w-1/3 flex flex-col gap-6 backdrop-blur-sm">
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">Get in Touch</h2>
                    <p className="text-white/60 text-sm leading-relaxed">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
                </div>

                <div className="space-y-4 mt-auto">
                    <div className="flex items-center gap-3 text-sm text-white/80">
                        <div className="p-2 rounded bg-white/5 text-primary"><Mail size={16} /></div>
                        <span>{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/80">
                        <div className="p-2 rounded bg-white/5 text-primary"><Phone size={16} /></div>
                        <span>{personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/80">
                        <div className="p-2 rounded bg-white/5 text-primary"><MapPin size={16} /></div>
                        <span>{personalInfo.location}</span>
                    </div>
                </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

                <form onSubmit={handleSubmit} className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Name</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                            placeholder="John Doe"
                            value={formState.name}
                            onChange={e => setFormState({ ...formState, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Email</label>
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                            placeholder="john@example.com"
                            type="email"
                            value={formState.email}
                            onChange={e => setFormState({ ...formState, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-wider ml-1">Message</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none min-h-[150px]"
                            placeholder="Tell me about your project..."
                            value={formState.message}
                            onChange={e => setFormState({ ...formState, message: e.target.value })}
                            required
                        />
                    </div>
                </form>

                <div className="p-6 md:p-8 pt-0 z-10">
                    <button
                        onClick={handleSubmit}
                        disabled={status === "loading"}
                        className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white p-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    );
}
