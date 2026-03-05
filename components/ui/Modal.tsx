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
                className="fixed inset-0 bg-black/40 transition-opacity"
                onClick={onClose}
            />
            <div
                className={`relative bg-white rounded-lg shadow-lg ${maxWidth} w-full mx-4 max-h-[90vh] overflow-y-auto`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-heading">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md text-muted hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
