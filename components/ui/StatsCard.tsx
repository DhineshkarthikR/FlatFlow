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
            className={`bg-[var(--bg-surface)]/80 backdrop-blur-md rounded-2xl border border-[var(--border-subtle)] shadow-lg shadow-[var(--shadow-color)] p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300 ${className}`}
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                    <p className="text-sm font-medium text-[var(--text-muted)]">{title}</p>
                    <p className="text-3xl font-extrabold text-[var(--text-heading)] tracking-tight">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
                    )}
                    {trend && (
                        <p className="text-xs text-cyan-400 font-medium tracking-wide">{trend}</p>
                    )}
                </div>
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/20 to-cyan-500/20 border border-[var(--accent-primary)]/30 flex items-center justify-center shadow-[inset_0_0_15px_var(--accent-glow)]">
                    <Icon className="h-7 w-7 text-[var(--accent-primary)] drop-shadow-[0_0_8px_var(--accent-glow)]" />
                </div>
            </div>
        </div>
    );
}
