"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Bell, Settings, LogOut, ChevronDown } from "lucide-react";

interface NavbarProps {
    userName: string;
    userRole: string;
    onLogout: () => void;
}

export default function Navbar({ userName, userRole, onLogout }: NavbarProps) {
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
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30">
            <div>
                <h1 className="text-lg font-semibold text-heading">
                    {userRole === "admin" ? "Admin Panel" : "Resident Portal"}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <Link href={userRole === "admin" ? "/admin/notices" : "/dashboard/notices"}>
                    <button className="relative p-2 rounded-lg text-muted hover:bg-gray-50 transition-colors">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary-600 rounded-full" />
                    </button>
                </Link>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                        <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-600" />
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-medium text-heading">{userName}</p>
                            <p className="text-xs text-muted capitalize">{userRole}</p>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                            <Link
                                href={profileLink}
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-heading hover:bg-gray-50 transition-colors"
                            >
                                <Settings className="h-4 w-4 text-muted" />
                                Profile Settings
                            </Link>
                            <div className="h-px bg-gray-100 my-1" />
                            <button
                                onClick={() => {
                                    setIsProfileOpen(false);
                                    onLogout();
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
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
