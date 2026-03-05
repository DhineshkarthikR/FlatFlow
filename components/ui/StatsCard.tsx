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
            className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${className}`}
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted">{title}</p>
                    <p className="text-2xl font-bold text-heading">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-muted">{subtitle}</p>
                    )}
                    {trend && (
                        <p className="text-xs text-green-600 font-medium">{trend}</p>
                    )}
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary-600" />
                </div>
            </div>
        </div>
    );
}
