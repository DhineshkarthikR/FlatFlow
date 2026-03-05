"use client";

import { User, Bell } from "lucide-react";

interface NavbarProps {
    userName: string;
    userRole: string;
}

export default function Navbar({ userName, userRole }: NavbarProps) {
    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30">
            <div>
                <h1 className="text-lg font-semibold text-heading">
                    {userRole === "admin" ? "Admin Panel" : "Resident Portal"}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-lg text-muted hover:bg-gray-50 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary-600 rounded-full" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-heading">{userName}</p>
                        <p className="text-xs text-muted capitalize">{userRole}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
