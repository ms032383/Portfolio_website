"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Lock, Unlock, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AdminAuth() {
    const { login } = useAdmin();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const success = login(password);
        if (!success) {
            setError(true);
            setIsLoading(false);
            setPassword("");
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-[#09090b] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05),transparent_70%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                    {/* Gloss effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="flex flex-col items-center mb-8">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${error ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={32} />
                            ) : error ? (
                                <Lock size={32} />
                            ) : (
                                <Lock size={32} />
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">System Access</h1>
                        <p className="text-white/40 text-sm mt-1">Enter root password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4 relative z-10">
                        <div className="relative group">
                            <input
                                autoFocus
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10 group-hover:border-white/20'} rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-mono tracking-widest text-center`}
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            disabled={isLoading || !password}
                            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? "Authenticating..." : "Unlock Dashboard"}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-xs text-center mt-4 font-mono"
                        >
                            ACCESS DENIED: Invalid credentials
                        </motion.p>
                    )}
                </div>

                <p className="text-center text-white/20 text-xs mt-6 font-mono">MohanOS Kernel v1.0.4 Security Module</p>
            </motion.div>
        </div>
    );
}
