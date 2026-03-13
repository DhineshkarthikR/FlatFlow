"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Bell, Settings, LogOut, ChevronDown, Menu } from "lucide-react";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

interface NavbarProps {
    userName: string;
    userRole: string;
    onLogout: () => void;
    onMenuClick: () => void;
}

export default function Navbar({ userName, userRole, onLogout, onMenuClick }: NavbarProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const profileLink = userRole === "admin" ? "/admin/profile" : "/dashboard/profile";

    return (
        <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center justify-between px-4 sm:px-6 z-30 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    aria-label="Toggle menu"
                    className="lg:hidden p-2 -ml-2 text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-heading)] rounded-lg transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-lg font-semibold text-[var(--text-heading)] truncate max-w-[150px] sm:max-w-none">
                    {userRole === "admin" ? "Admin Panel" : "Resident Portal"}
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <ThemeSwitcher />

                <Link href={userRole === "admin" ? "/admin/notices" : "/dashboard/notices"}>
                    <button aria-label="Notifications" className="relative p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-heading)] transition-colors">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[var(--accent-primary)] rounded-full shadow-[0_0_8px_var(--accent-glow)]" />
                    </button>
                </Link>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        aria-label="User profile dropdown"
                        aria-expanded={isProfileOpen}
                        className="flex items-center gap-3 pl-4 border-l border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)] p-2 rounded-lg transition-colors"
                    >
                        <div className="h-8 w-8 bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-[var(--accent-primary)]" />
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-medium text-[var(--text-heading)]">{userName}</p>
                            <p className="text-xs text-[var(--text-muted)] capitalize">{userRole}</p>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-[var(--text-muted)] transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-elevated)] rounded-xl shadow-2xl border border-[var(--border-color)] py-1 z-50">
                            <Link
                                href={profileLink}
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text-body)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-heading)] transition-colors"
                            >
                                <Settings className="h-4 w-4 text-[var(--text-muted)]" />
                                Profile Settings
                            </Link>
                            <div className="h-px bg-[var(--border-subtle)] my-1" />
                            <button
                                onClick={() => {
                                    setIsProfileOpen(false);
                                    onLogout();
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
