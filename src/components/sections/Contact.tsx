"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Simulate EmailJS call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus("success");
        setFormState({ name: "", email: "", message: "" });

        // Reset status after 3 seconds
        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <Section id="contact" className="relative pb-32">
            <div className="flex flex-col gap-4 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                    Get In Touch
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="max-w-xl mx-auto">
                <Card className="p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                placeholder="John Doe"
                                value={formState.name}
                                onChange={e => setFormState({ ...formState, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                placeholder="john@example.com"
                                value={formState.email}
                                onChange={e => setFormState({ ...formState, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                placeholder="I have an idea for a project..."
                                value={formState.message}
                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={status === "loading" || status === "success"}
                        >
                            {status === "loading" ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                            ) : status === "success" ? (
                                <><CheckCircle className="w-4 h-4 mr-2" /> Sent Successfully</>
                            ) : (
                                <><Send className="w-4 h-4 mr-2" /> Send Message</>
                            )}
                        </Button>
                    </form>
                </Card>
            </div>
        </Section>
    );
}
