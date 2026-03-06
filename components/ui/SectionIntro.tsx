"use client";

import { useEffect, useState } from "react";
import {
    MessageSquare, AlertTriangle, CheckCircle2, Clock,
    Bell, Megaphone, Info,
    Calendar, Building2, PartyPopper, Music,
    UserCheck, Shield, Scan, Fingerprint,
} from "lucide-react";

type SectionTheme = "complaints" | "notices" | "bookings" | "visitors";

interface SectionIntroProps {
    theme: SectionTheme;
    onComplete: () => void;
}

/* ─── Theme configs ─── */
const configs: Record<SectionTheme, {
    title: string;
    subtitle: string;
    gradient: string;
    accentColor: string;
    bgGlow: string;
}> = {
    complaints: {
        title: "Complaint Center",
        subtitle: "Resolving issues for your community...",
        gradient: "linear-gradient(135deg, #ef4444 0%, #f97316 40%, #eab308 100%)",
        accentColor: "#f97316",
        bgGlow: "rgba(249, 115, 22, 0.15)",
    },
    notices: {
        title: "Notice Board",
        subtitle: "Stay informed with society updates...",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 40%, #8b5cf6 100%)",
        accentColor: "#3b82f6",
        bgGlow: "rgba(59, 130, 246, 0.15)",
    },
    bookings: {
        title: "Facility Booking",
        subtitle: "Reserve your community spaces...",
        gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 40%, #06b6d4 100%)",
        accentColor: "#14b8a6",
        bgGlow: "rgba(20, 184, 166, 0.15)",
    },
    visitors: {
        title: "Visitor Management",
        subtitle: "Secure access for your community...",
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 40%, #d946ef 100%)",
        accentColor: "#a855f7",
        bgGlow: "rgba(168, 85, 247, 0.15)",
    },
};

/* ─── Floating icon configs per theme ─── */
function getFloatingIcons(theme: SectionTheme) {
    const map = {
        complaints: [
            { Icon: MessageSquare, x: -160, y: -90, size: 36, delay: 0.2 },
            { Icon: AlertTriangle, x: 180, y: -70, size: 30, delay: 0.6 },
            { Icon: CheckCircle2, x: -130, y: 100, size: 28, delay: 1.0 },
            { Icon: Clock, x: 200, y: 90, size: 32, delay: 0.4 },
        ],
        notices: [
            { Icon: Bell, x: -170, y: -80, size: 34, delay: 0.3 },
            { Icon: Megaphone, x: 190, y: -60, size: 30, delay: 0.7 },
            { Icon: Info, x: -140, y: 110, size: 26, delay: 1.1 },
            { Icon: Bell, x: 160, y: 100, size: 32, delay: 0.5 },
        ],
        bookings: [
            { Icon: Calendar, x: -180, y: -85, size: 36, delay: 0.2 },
            { Icon: Building2, x: 170, y: -75, size: 30, delay: 0.6 },
            { Icon: PartyPopper, x: -120, y: 105, size: 28, delay: 1.0 },
            { Icon: Music, x: 210, y: 85, size: 34, delay: 0.4 },
        ],
        visitors: [
            { Icon: UserCheck, x: -165, y: -95, size: 34, delay: 0.3 },
            { Icon: Shield, x: 175, y: -65, size: 30, delay: 0.7 },
            { Icon: Scan, x: -145, y: 100, size: 28, delay: 1.1 },
            { Icon: Fingerprint, x: 195, y: 95, size: 36, delay: 0.5 },
        ],
    };
    return map[theme];
}

/* ─── The main 3D hero item per theme ─── */
function HeroElement({ theme }: { theme: SectionTheme }) {
    const bg = configs[theme].gradient;

    if (theme === "complaints") {
        /* Speech-bubble style complaint card */
        return (
            <div className="relative" style={{
                width: 320, height: 200, transformStyle: "preserve-3d",
                animation: "card-hero-rotate 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
            }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{
                    backfaceVisibility: "hidden", background: bg,
                    boxShadow: `0 25px 60px rgba(249, 115, 22, 0.4), 0 0 80px rgba(249, 115, 22, 0.2), inset 0 1px 1px rgba(255,255,255,0.2)`,
                }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 100%)",
                        animation: "shine-sweep 3s ease-in-out 0.5s both",
                    }} />
                    <div className="relative h-full flex flex-col justify-between p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-white" /></div>
                            <div>
                                <div className="text-white font-bold text-sm">New Complaint</div>
                                <div className="text-white/60 text-xs">Plumbing Issue – Block A</div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                                <span className="text-[10px] text-white/70 uppercase tracking-wider">In Progress</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" style={{ animation: "progress-fill 4s ease-in-out infinite" }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-white/50">Priority: High</span>
                            <div className="flex -space-x-2">
                                {[0, 1, 2].map(i => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-orange-600 bg-gradient-to-br from-orange-300 to-orange-500" style={{ opacity: 1 - i * 0.2 }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (theme === "notices") {
        /* Notice board / bulletin card */
        return (
            <div className="relative" style={{
                width: 300, height: 220, transformStyle: "preserve-3d",
                animation: "card-hero-rotate 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
            }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{
                    backfaceVisibility: "hidden", background: bg,
                    boxShadow: `0 25px 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2), inset 0 1px 1px rgba(255,255,255,0.2)`,
                }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 100%)",
                        animation: "shine-sweep 3s ease-in-out 0.5s both",
                    }} />
                    <div className="relative h-full flex flex-col justify-between p-6">
                        <div className="flex items-center gap-2">
                            <Bell className="w-5 h-5 text-white" />
                            <span className="text-white font-bold text-sm tracking-wide">SOCIETY NOTICE</span>
                        </div>
                        {/* Stacked notice previews */}
                        <div className="space-y-2">
                            {["Annual General Meeting – March 15", "Water Tank Cleaning – Block B", "Parking Re-allocation Notice"].map((text, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 opacity-0" style={{
                                    animation: `feed-slide-in 8s ease-in-out infinite ${i * 1.2 + 1}s`,
                                }}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-cyan-300' : i === 1 ? 'bg-blue-300' : 'bg-purple-300'}`} />
                                        <span className="text-[10px] text-white/80 truncate">{text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between text-[9px] text-white/40">
                            <span>3 new notices</span>
                            <span>Updated today</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (theme === "bookings") {
        /* Calendar / facility card */
        return (
            <div className="relative" style={{
                width: 320, height: 210, transformStyle: "preserve-3d",
                animation: "card-hero-rotate 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
            }}>
                <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{
                    backfaceVisibility: "hidden", background: bg,
                    boxShadow: `0 25px 60px rgba(20, 184, 166, 0.4), 0 0 80px rgba(20, 184, 166, 0.2), inset 0 1px 1px rgba(255,255,255,0.2)`,
                }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 100%)",
                        animation: "shine-sweep 3s ease-in-out 0.5s both",
                    }} />
                    <div className="relative h-full flex flex-col justify-between p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-white" />
                                <span className="text-white font-bold text-sm">Book a Space</span>
                            </div>
                            <span className="text-[10px] text-white/50 bg-white/10 px-2 py-1 rounded-md">March 2026</span>
                        </div>
                        {/* Mini calendar grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                <div key={`h-${i}`} className="text-[8px] text-white/40 text-center">{d}</div>
                            ))}
                            {Array.from({ length: 28 }).map((_, i) => {
                                const isBooked = [4, 11, 15, 22].includes(i);
                                const isToday = i === 6;
                                return (
                                    <div key={i} className={`w-full aspect-square rounded-md flex items-center justify-center text-[9px] transition-all
                                        ${isToday ? 'bg-white text-emerald-700 font-bold shadow-[0_0_10px_rgba(255,255,255,0.5)]' :
                                            isBooked ? 'bg-emerald-400/30 text-white/80 border border-emerald-400/40' :
                                                'text-white/40 hover:bg-white/10'}`}
                                        style={isBooked ? { animation: `feed-slide-in 8s ease-in-out infinite ${i * 0.3}s` } : undefined}
                                    >
                                        {i + 1}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-3 text-[9px]">
                            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-emerald-400/50" /><span className="text-white/50">Booked</span></div>
                            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-white" /><span className="text-white/50">Today</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* visitors – ID badge / security scan card */
    return (
        <div className="relative" style={{
            width: 280, height: 220, transformStyle: "preserve-3d",
            animation: "card-hero-rotate 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        }}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{
                backfaceVisibility: "hidden", background: bg,
                boxShadow: `0 25px 60px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2), inset 0 1px 1px rgba(255,255,255,0.2)`,
            }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 100%)",
                    animation: "shine-sweep 3s ease-in-out 0.5s both",
                }} />
                <div className="relative h-full flex flex-col items-center justify-between p-6">
                    <div className="flex items-center gap-2 self-start">
                        <Shield className="w-4 h-4 text-white" />
                        <span className="text-white font-bold text-xs uppercase tracking-widest">Visitor Pass</span>
                    </div>
                    {/* ID photo placeholder */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center">
                            <UserCheck className="w-8 h-8 text-white/80" />
                        </div>
                        {/* Scanning ring */}
                        <div className="absolute -inset-3 rounded-full border-2 border-purple-300/40" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
                        <div className="absolute -inset-6 rounded-full border border-purple-300/20" style={{ animation: "glow-pulse 2s ease-in-out infinite 0.5s" }} />
                    </div>
                    <div className="text-center space-y-1">
                        <div className="text-white/90 text-sm font-medium" style={{ animation: "number-reveal 2s ease-out 1s both" }}>Ravi Kumar</div>
                        <div className="text-white/40 text-[10px]">Flat 7A · Entry 09:42 AM</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] text-green-300/80 font-medium">VERIFIED</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Main component ─── */
export default function SectionIntro({ theme, onComplete }: SectionIntroProps) {
    const [phase, setPhase] = useState<"animate" | "exit">("animate");
    const config = configs[theme];
    const floatingIcons = getFloatingIcons(theme);

    useEffect(() => {
        const exitTimer = setTimeout(() => setPhase("exit"), 3800);
        const completeTimer = setTimeout(() => onComplete(), 4600);
        return () => {
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            style={{ background: `radial-gradient(ellipse at center, ${config.bgGlow.replace('0.15', '0.25')} 0%, #0B0F19 70%)` }}
        >
            {/* Ambient particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className="absolute rounded-full" style={{
                        width: `${2 + Math.random() * 4}px`,
                        height: `${2 + Math.random() * 4}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: config.accentColor,
                        opacity: 0.15 + Math.random() * 0.25,
                        animation: `float-particle ${3 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 3}s`,
                    }} />
                ))}
            </div>

            {/* 3D Stage */}
            <div className="relative" style={{ perspective: "1200px" }}>
                {/* Floating icons */}
                {floatingIcons.map((item, i) => (
                    <div key={i} className="absolute rounded-full flex items-center justify-center z-0" style={{
                        width: item.size, height: item.size,
                        left: `calc(50% + ${item.x}px)`,
                        top: `calc(50% + ${item.y}px)`,
                        background: config.gradient,
                        boxShadow: `0 0 20px ${config.accentColor}80, inset 0 1px 2px rgba(255,255,255,0.3)`,
                        animation: `coin-float 4s ease-in-out infinite ${item.delay}s, coin-spin 5s linear infinite ${item.delay}s`,
                        opacity: 0,
                        animationFillMode: "forwards",
                    }}>
                        <item.Icon className="text-white/90" style={{ width: item.size * 0.5, height: item.size * 0.5 }} />
                    </div>
                ))}

                {/* Stacked cards behind */}
                {[3, 2, 1].map((i) => (
                    <div key={i} className="absolute rounded-2xl" style={{
                        width: 320, height: 200,
                        left: "50%", top: "50%",
                        marginLeft: -160, marginTop: -100,
                        background: `linear-gradient(135deg, ${config.accentColor}20 0%, ${config.accentColor}10 100%)`,
                        border: `1px solid ${config.accentColor}20`,
                        transform: `rotateY(${i * 8}deg) rotateX(${i * 3}deg) translateZ(${-i * 30}px)`,
                        animation: `card-fan-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.15}s both`,
                        filter: `blur(${i * 0.8}px)`,
                    }} />
                ))}

                {/* Main hero element */}
                <div className="relative z-10">
                    <HeroElement theme={theme} />
                </div>

                {/* Glow */}
                <div className="absolute z-0 rounded-full" style={{
                    width: 450, height: 450,
                    left: "50%", top: "50%",
                    marginLeft: -225, marginTop: -225,
                    background: `radial-gradient(circle, ${config.bgGlow} 0%, transparent 70%)`,
                    animation: "glow-pulse 3s ease-in-out infinite",
                }} />
            </div>

            {/* Text */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center" style={{ animation: "text-fade-up 1s ease-out 1.5s both" }}>
                <h2 className="text-2xl font-heading font-bold text-white mb-2">{config.title}</h2>
                <p className="text-sm text-gray-400">{config.subtitle}</p>
            </div>
        </div>
    );
}
