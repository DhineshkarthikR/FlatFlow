import React from "react";

interface BadgeProps {
    variant?: "default" | "success" | "warning" | "danger" | "info";
    children: React.ReactNode;
    className?: string;
}

export default function Badge({
    variant = "default",
    children,
    className = "",
}: BadgeProps) {
    const variants = {
        default: "bg-gray-100 text-gray-700",
        success: "bg-green-50 text-green-700",
        warning: "bg-amber-50 text-amber-700",
        danger: "bg-red-50 text-red-700",
        info: "bg-blue-50 text-blue-700",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
}

export function StatusBadge({ status }: { status: string }) {
    const variantMap: Record<string, "success" | "warning" | "danger" | "info" | "default"> = {
        completed: "success",
        resolved: "success",
        confirmed: "success",
        approved: "info",
        pending: "warning",
        failed: "danger",
        cancelled: "danger",
    };

    return (
        <Badge variant={variantMap[status] || "default"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    );
}
