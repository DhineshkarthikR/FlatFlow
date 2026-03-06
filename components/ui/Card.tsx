import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: boolean;
}

export default function Card({ children, className = "", padding = true }: CardProps) {
    return (
        <div
            className={`bg-[#131A2A]/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg ${padding ? "p-6 sm:p-8" : ""
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
        <div className={`mb-6 border-b border-white/5 pb-4 ${className}`}>
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
        <h3 className={`text-xl font-semibold text-white tracking-wide ${className}`}>
            {children}
        </h3>
    );
}
