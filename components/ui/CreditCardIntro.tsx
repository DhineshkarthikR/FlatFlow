"use client";

import { useEffect, useState } from "react";
import { IndianRupee, Shield, Wifi } from "lucide-react";

export default function CreditCardIntro({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"animate" | "exit">("animate");

    useEffect(() => {
        // After the intro animation plays, start exit
        const exitTimer = setTimeout(() => setPhase("exit"), 3800);
        const completeTimer = setTimeout(() => onComplete(), 4600);
        return () => {
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            style={{ background: "radial-gradient(ellipse at center, #1a1040 0%, #0B0F19 70%)" }}
        >
            {/* Ambient floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${2 + Math.random() * 4}px`,
                            height: `${2 + Math.random() * 4}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: `rgba(${120 + Math.random() * 135}, ${80 + Math.random() * 100}, 255, ${0.15 + Math.random() * 0.3})`,
                            animation: `float-particle ${3 + Math.random() * 5}s ease-in-out infinite ${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* 3D Stage */}
            <div className="relative" style={{ perspective: "1200px" }}>
                {/* Floating Rupee coins behind */}
                {[
                    { x: -180, y: -100, size: 40, delay: 0.3, dur: 4 },
                    { x: 200, y: -80, size: 32, delay: 0.8, dur: 5 },
                    { x: -150, y: 120, size: 28, delay: 1.2, dur: 4.5 },
                    { x: 220, y: 100, size: 36, delay: 0.5, dur: 3.8 },
                    { x: -60, y: -140, size: 24, delay: 1.5, dur: 4.2 },
                ].map((coin, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full flex items-center justify-center z-0"
                        style={{
                            width: coin.size,
                            height: coin.size,
                            left: `calc(50% + ${coin.x}px)`,
                            top: `calc(50% + ${coin.y}px)`,
                            background: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #4f46e5 100%)",
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.6), inset 0 1px 2px rgba(255,255,255,0.3)",
                            animation: `coin-float ${coin.dur}s ease-in-out infinite ${coin.delay}s, coin-spin ${coin.dur * 1.5}s linear infinite ${coin.delay}s`,
                            opacity: 0,
                            animationFillMode: "forwards",
                        }}
                    >
                        <IndianRupee className="text-white/90" style={{ width: coin.size * 0.5, height: coin.size * 0.5 }} />
                    </div>
                ))}

                {/* Stacked cards (fanned out behind) */}
                {[3, 2, 1].map((i) => (
                    <div
                        key={i}
                        className="absolute rounded-2xl"
                        style={{
                            width: 380,
                            height: 230,
                            left: "50%",
                            top: "50%",
                            marginLeft: -190,
                            marginTop: -115,
                            background: `linear-gradient(135deg, 
                                rgba(99, 60, 200, ${0.15 + i * 0.08}) 0%, 
                                rgba(79, 70, 229, ${0.1 + i * 0.06}) 50%, 
                                rgba(139, 92, 246, ${0.08 + i * 0.04}) 100%)`,
                            border: "1px solid rgba(139, 92, 246, 0.15)",
                            transform: `rotateY(${i * 8}deg) rotateX(${i * 3}deg) translateZ(${-i * 30}px)`,
                            animation: `card-fan-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.15}s both`,
                            filter: `blur(${i * 0.8}px)`,
                        }}
                    />
                ))}

                {/* Main Card */}
                <div
                    className="relative z-10"
                    style={{
                        width: 380,
                        height: 230,
                        transformStyle: "preserve-3d",
                        animation: "card-hero-rotate 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
                    }}
                >
                    {/* Front face */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden"
                        style={{
                            backfaceVisibility: "hidden",
                            background: "linear-gradient(135deg, #6d28d9 0%, #4f46e5 30%, #7c3aed 60%, #8b5cf6 100%)",
                            boxShadow: "0 25px 60px rgba(79, 70, 229, 0.5), 0 0 80px rgba(139, 92, 246, 0.3), inset 0 1px 1px rgba(255,255,255,0.2)",
                        }}
                    >
                        {/* Glossy overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0) 100%)",
                                animation: "shine-sweep 3s ease-in-out 0.5s both",
                            }}
                        />

                        {/* Holographic pattern */}
                        <div
                            className="absolute inset-0 opacity-[0.08] pointer-events-none"
                            style={{
                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)`,
                            }}
                        />

                        {/* Card Content */}
                        <div className="relative h-full flex flex-col justify-between p-6">
                            {/* Top Row */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                        <IndianRupee className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-white/90 text-sm font-heading font-bold tracking-wider">FLATFLOW</span>
                                </div>
                                <Wifi className="w-5 h-5 text-white/60 rotate-90" />
                            </div>

                            {/* Chip */}
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-9 rounded-md overflow-hidden"
                                    style={{
                                        background: "linear-gradient(135deg, #e5c97b 0%, #c9a84c 30%, #f0d78c 60%, #c9a84c 100%)",
                                        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    <div className="grid grid-cols-3 grid-rows-3 h-full w-full gap-[1px] p-[3px]">
                                        {Array.from({ length: 9 }).map((_, j) => (
                                            <div key={j} className="rounded-[1px] bg-gradient-to-br from-[#d4a84a] to-[#f0d78c]" />
                                        ))}
                                    </div>
                                </div>
                                <div className="text-white/70 text-lg font-mono tracking-[0.25em] font-light" style={{ animation: "number-reveal 2s ease-out 1s both" }}>
                                    •••• •••• •••• 4829
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Card Holder</div>
                                    <div className="text-sm text-white/90 font-medium tracking-wide">RESIDENT MEMBER</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="text-right">
                                        <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Valid Thru</div>
                                        <div className="text-sm text-white/90 font-medium">12/28</div>
                                    </div>
                                    <Shield className="w-7 h-7 text-white/30 ml-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glow circle behind card */}
                <div
                    className="absolute z-0 rounded-full"
                    style={{
                        width: 500,
                        height: 500,
                        left: "50%",
                        top: "50%",
                        marginLeft: -250,
                        marginTop: -250,
                        background: "radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 70%)",
                        animation: "glow-pulse 3s ease-in-out infinite",
                    }}
                />
            </div>

            {/* Text below */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center" style={{ animation: "text-fade-up 1s ease-out 1.5s both" }}>
                <h2 className="text-2xl font-heading font-bold text-white mb-2">Secure Payments</h2>
                <p className="text-sm text-gray-400">Processing your society transactions...</p>
            </div>
        </div>
    );
}
