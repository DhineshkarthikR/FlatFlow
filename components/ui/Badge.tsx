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
        default: "bg-[var(--badge-default-bg)] text-[var(--badge-default-text)]",
        success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)]",
        warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]",
        danger: "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)]",
        info: "bg-[var(--badge-info-bg)] text-[var(--badge-info-text)]",
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
