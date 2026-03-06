import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    subtitle?: string;
    trend?: string;
    className?: string;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    subtitle,
    trend,
    className = "",
}: StatsCardProps) {
    return (
        <div
            className={`bg-[#131A2A]/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg p-6 sm:p-8 hover:-translate-y-1 transition-transform duration-300 ${className}`}
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <p className="text-3xl font-extrabold text-white tracking-tight">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500">{subtitle}</p>
                    )}
                    {trend && (
                        <p className="text-xs text-cyan-400 font-medium tracking-wide">{trend}</p>
                    )}
                </div>
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary-600/20 to-cyan-500/20 border border-primary-500/30 flex items-center justify-center shadow-[inset_0_0_15px_rgba(79,70,229,0.2)]">
                    <Icon className="h-7 w-7 text-primary-400 drop-shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                </div>
            </div>
        </div>
    );
}
