"use client";

import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Sparkles, ChevronDown } from "lucide-react";
import { useTheme, Theme } from "@/components/ThemeProvider";

const themes: { value: Theme; label: string; icon: typeof Sun; description: string }[] = [
    { value: "light", label: "Light", icon: Sun, description: "Clean & bright" },
    { value: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes" },
    { value: "galaxy", label: "Galaxy", icon: Sparkles, description: "Deep space vibes" },
];

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentTheme = themes.find((t) => t.value === theme) || themes[1];
    const CurrentIcon = currentTheme.icon;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Switch theme"
                aria-expanded={isOpen}
                className="flex items-center gap-2 p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-heading)] transition-all duration-200"
            >
                <CurrentIcon className="h-5 w-5" />
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] shadow-xl shadow-[var(--shadow-color)] py-1.5 z-50 animate-fade-in-up">
                    {themes.map((t) => {
                        const Icon = t.icon;
                        const isActive = theme === t.value;
                        return (
                            <button
                                key={t.value}
                                onClick={() => {
                                    setTheme(t.value);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors duration-150 ${
                                    isActive
                                        ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                                        : "text-[var(--text-body)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-heading)]"
                                }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{t.label}</span>
                                    <span className={`text-[10px] ${isActive ? "opacity-70" : "text-[var(--text-muted)]"}`}>
                                        {t.description}
                                    </span>
                                </div>
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
