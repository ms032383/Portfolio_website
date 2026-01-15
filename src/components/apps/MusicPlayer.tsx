"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Search, Home as HomeIcon, Library, Clock, Music4 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Song {
    name: string;
    url: string;
    duration?: string;
}

export function MusicPlayer() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        fetch('/api/music')
            .then(res => res.json())
            .then(data => setSongs(data.files || []))
            .catch(err => console.error("Failed to load music", err));
    }, []);

    const playAudio = async () => {
        if (!audioRef.current) return;
        try {
            await audioRef.current.play();
        } catch (err: any) {
            if (err.name !== "AbortError") {
                console.error("Playback failed", err);
            }
        }
    };

    useEffect(() => {
        if (currentSongIndex !== null && audioRef.current) {
            audioRef.current.src = songs[currentSongIndex].url;
            if (isPlaying) {
                playAudio();
            }
        }
    }, [currentSongIndex]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                playAudio();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration || 1;
            setProgress((current / total) * 100);
        }
    };

    const handleNext = () => {
        if (songs.length === 0) return;
        let nextIndex = (currentSongIndex ?? -1) + 1;
        if (nextIndex >= songs.length) nextIndex = 0;
        setCurrentSongIndex(nextIndex);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        if (songs.length === 0) return;
        let prevIndex = (currentSongIndex ?? 0) - 1;
        if (prevIndex < 0) prevIndex = songs.length - 1;
        setCurrentSongIndex(prevIndex);
        setIsPlaying(true);
    };

    const handleSongClick = (index: number) => {
        if (currentSongIndex === index) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentSongIndex(index);
            setIsPlaying(true);
        }
    };

    const formatSongName = (filename: string) => {
        return filename.replace(/\.(mp3|wav|ogg|m4a)$/i, "").replace(/-/g, " ");
    };

    return (
        <div className="flex flex-col h-full bg-[#121212] text-white font-sans overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-56 bg-black p-6 flex flex-col gap-6 shrink-0 md:flex hidden">
                    <div className="flex items-center gap-2 mb-4">
                        <SpotifyLogo className="w-8 h-8 text-white" />
                        <span className="font-bold text-xl tracking-tight">Music</span>
                    </div>
                    <nav className="space-y-4">
                        <NavItem icon={<HomeIcon />} label="Home" active />
                        <NavItem icon={<Search />} label="Search" />
                        <NavItem icon={<Library />} label="Your Library" />
                    </nav>
                    <div className="mt-6 pt-6 border-t border-[#282828] space-y-3">
                        <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition cursor-pointer">
                            <div className="w-6 h-6 bg-gray-300 flex items-center justify-center rounded-sm">
                                <span className="text-black text-xs font-bold">+</span>
                            </div>
                            <span className="font-bold text-sm">Create Playlist</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition cursor-pointer">
                            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-300 flex items-center justify-center rounded-sm">
                                <span className="text-white text-[10px]">♥</span>
                            </div>
                            <span className="font-bold text-sm">Liked Songs</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gradient-to-b from-[#1e1e2e] to-[#121212] p-6 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Local Library</h2>
                        <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-xs font-bold border border-white/10">
                            MS
                        </div>
                    </div>

                    {/* Song List */}
                    <div className="space-y-2">
                        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 text-xs font-bold text-[#b3b3b3] uppercase border-b border-[#282828] mb-2 sticky top-0 bg-[#121212]/50 backdrop-blur-md">
                            <span className="w-4">#</span>
                            <span>Title</span>
                            <span>Date Added</span>
                            <Clock size={16} />
                        </div>

                        {songs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-[#b3b3b3]">
                                <Music4 size={48} className="mb-4 opacity-50" />
                                <h3 className="text-lg font-bold mb-2">It's a bit quiet here</h3>
                                <p className="text-sm">Add .mp3 files to <code>public/audio</code> to play them.</p>
                            </div>
                        ) : (
                            songs.map((song, idx) => {
                                const isCurrent = currentSongIndex === idx;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleSongClick(idx)}
                                        className={cn(
                                            "grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-3 rounded-md hover:bg-white/10 group cursor-pointer transition-colors items-center text-sm",
                                            isCurrent && "bg-white/10"
                                        )}
                                    >
                                        <span className="w-4 text-[#b3b3b3] group-hover:hidden">{idx + 1}</span>
                                        <span className="w-4 hidden group-hover:block text-white">
                                            {isCurrent && isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                                        </span>

                                        <div className="flex flex-col">
                                            <span className={cn("font-medium", isCurrent ? "text-green-500" : "text-white")}>
                                                {formatSongName(song.name)}
                                            </span>
                                            <span className="text-xs text-[#b3b3b3] md:hidden">Unknown Artist</span>
                                        </div>

                                        <span className="text-[#b3b3b3] text-xs hidden md:block">Just now</span>
                                        <span className="text-[#b3b3b3] text-xs">--:--</span>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* Player Controls */}
            <div className="h-20 bg-[#181818] border-t border-[#282828] flex items-center justify-between px-4 shrink-0 z-20">
                <div className="flex items-center gap-4 w-[30%]">
                    {currentSongIndex !== null && songs[currentSongIndex] && (
                        <>
                            <div className="w-12 h-12 bg-[#282828] flex items-center justify-center rounded overflow-hidden">
                                <Music4 className="text-white/50" />
                            </div>
                            <div className="flex flex-col justify-center overflow-hidden">
                                <span className="font-bold text-sm text-white truncate hover:underline cursor-pointer">
                                    {formatSongName(songs[currentSongIndex].name)}
                                </span>
                                <span className="text-xs text-[#b3b3b3] hover:underline cursor-pointer">
                                    Local Audio
                                </span>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col items-center max-w-[40%] w-full gap-2">
                    <div className="flex items-center gap-6">
                        <button onClick={handlePrev} className="text-[#b3b3b3] hover:text-white transition"><SkipBack size={20} fill="currentColor" /></button>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
                        >
                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="translate-x-0.5" />}
                        </button>
                        <button onClick={handleNext} className="text-[#b3b3b3] hover:text-white transition"><SkipForward size={20} fill="currentColor" /></button>
                    </div>
                    <div className="w-full h-1 bg-[#4d4d4d] rounded-full relative group">
                        <div
                            className="h-full bg-white rounded-full group-hover:bg-green-500 transition-colors relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="w-3 h-3 bg-white rounded-full absolute -right-1.5 -top-1 opacity-0 group-hover:opacity-100 shadow-md"></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end w-[30%] gap-2">
                    <Volume2 size={18} className="text-[#b3b3b3]" />
                    <div className="w-24 h-1 bg-[#4d4d4d] rounded-full">
                        <div className="h-full bg-white rounded-full hover:bg-green-500" style={{ width: `${volume * 100}%` }}></div>
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleNext}
                />
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-4 font-bold text-sm cursor-pointer transition",
            active ? "text-white opacity-100" : "text-[#b3b3b3] hover:text-white opacity-100"
        )}>
            {icon}
            <span>{label}</span>
        </div>
    );
}

function SpotifyLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 15.6 1.44.6.24.84.9.6 1.5-.3.602-.96.841-1.62.54z" />
        </svg>
    )
}
