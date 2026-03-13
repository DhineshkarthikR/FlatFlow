"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-lg",
}: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-[var(--overlay-bg)] backdrop-blur-sm transition-opacity cursor-pointer"
                onClick={onClose}
            />
            <div
                className={`relative bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-2xl shadow-[var(--shadow-color)] ${maxWidth} w-full mx-4 max-h-[90vh] overflow-y-auto animate-fade-in-up`}
            >
                <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
                    <h2 className="text-xl font-bold text-[var(--text-heading)] tracking-wide">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-surface-hover)] transition-all duration-200"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
