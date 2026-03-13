import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: boolean;
}

export default function Card({ children, className = "", padding = true }: CardProps) {
    return (
        <div
            className={`bg-[var(--bg-surface)]/80 backdrop-blur-md rounded-2xl border border-[var(--border-subtle)] shadow-lg shadow-[var(--shadow-color)] transition-colors duration-300 ${padding ? "p-6 sm:p-8" : ""
                } ${className}`}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`mb-6 border-b border-[var(--border-subtle)] pb-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h3 className={`text-xl font-semibold text-[var(--text-heading)] tracking-wide ${className}`}>
            {children}
        </h3>
    );
}
