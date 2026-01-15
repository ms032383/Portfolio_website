"use client";

import { useAdmin } from "@/context/AdminContext";
import { useState, useEffect } from "react";
import { Save, RefreshCw, Upload } from "lucide-react";

export function Config() {
    const { data, updateProfile } = useAdmin();
    const [profile, setProfile] = useState(data.profile);
    const [isSaving, setIsSaving] = useState(false);

    // Sync state if data changes externally (e.g. reload)
    useEffect(() => {
        setProfile(data.profile);
    }, [data.profile]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateProfile(profile);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div>
                    <h3 className="text-2xl font-bold text-white">System Configuration</h3>
                    <p className="text-white/40">Manage global profile settings and SEO parameters.</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Identity Section */}
                <section className="bg-white/5 border border-white/5 rounded-xl p-6 space-y-6">
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        Identity Matrix
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase block mb-1">Display Name</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none"
                                value={profile?.name || ""}
                                onChange={e => setProfile({ ...profile, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase block mb-1">Job Title</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none"
                                value={profile?.title || ""}
                                onChange={e => setProfile({ ...profile, title: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs font-bold text-white/40 uppercase block mb-1">Bio Tagline</label>
                            <textarea
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-primary/50 outline-none min-h-[80px]"
                                value={profile?.tagline || ""}
                                onChange={e => setProfile({ ...profile, tagline: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Points */}
                <section className="bg-white/5 border border-white/5 rounded-xl p-6 space-y-6">
                    <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Communication Uplink
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase block mb-1">Email Address</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-green-400/50 outline-none"
                                value={profile?.email || ""}
                                onChange={e => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase block mb-1">Phone Number</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-green-400/50 outline-none"
                                value={profile?.phone || ""}
                                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-white/40 uppercase block mb-1">Location</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-green-400/50 outline-none"
                                value={profile?.location || ""}
                                onChange={e => setProfile({ ...profile, location: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Resume Upload Placeholder */}
                <section className="bg-white/5 border border-white/5 rounded-xl p-6 flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Resume File</h4>
                        <p className="text-xs text-white/40">Current: {profile?.resumeUrl || "No file uploaded"}</p>
                    </div>
                    <button type="button" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                        <Upload size={16} />
                        Upload New Vesion
                    </button>
                </section>

                <div className="flex justify-end pt-4">
                    <button
                        disabled={isSaving}
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                        {isSaving ? "Compiling..." : "Save Configuration"}
                    </button>
                </div>
            </form>
        </div>
    );
}
