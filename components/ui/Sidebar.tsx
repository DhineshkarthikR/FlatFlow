"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    MessageSquare,
    CreditCard,
    Bell,
    Calendar,
    Users,
    UserCheck,
    BarChart3,
    LogOut,
    Layers,
    X,
} from "lucide-react";

interface SidebarLink {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const residentLinks: SidebarLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: "/dashboard/complaints", label: "Complaints", icon: <MessageSquare className="h-5 w-5" /> },
    { href: "/dashboard/payments", label: "Payments", icon: <CreditCard className="h-5 w-5" /> },
    { href: "/dashboard/notices", label: "Notices", icon: <Bell className="h-5 w-5" /> },
    { href: "/dashboard/bookings", label: "Bookings", icon: <Calendar className="h-5 w-5" /> },
    { href: "/dashboard/visitors", label: "Visitors", icon: <UserCheck className="h-5 w-5" /> },
];

const adminLinks: SidebarLink[] = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: "/admin/complaints", label: "Complaints", icon: <MessageSquare className="h-5 w-5" /> },
    { href: "/admin/payments", label: "Payments", icon: <CreditCard className="h-5 w-5" /> },
    { href: "/admin/notices", label: "Notices", icon: <Bell className="h-5 w-5" /> },
    { href: "/admin/residents", label: "Residents", icon: <Users className="h-5 w-5" /> },
    { href: "/admin/visitors", label: "Visitors", icon: <UserCheck className="h-5 w-5" /> },
    { href: "/admin/reports", label: "Reports", icon: <BarChart3 className="h-5 w-5" /> },
];

interface SidebarProps {
    role: "admin" | "resident";
    onLogout: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ role, onLogout, isOpen, setIsOpen }: SidebarProps) {
    const pathname = usePathname();
    const links = role === "admin" ? adminLinks : residentLinks;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-[#0B0F19] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <Link href={role === "admin" ? "/admin" : "/dashboard"} className="flex items-center gap-3 group">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-cyan-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all group-hover:scale-105">
                            <Layers className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">FlatFlow</span>
                    </Link>
                    <button
                        aria-label="Close menu"
                        className="lg:hidden p-2 text-muted hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {links.map((link) => {
                        const isActive =
                            pathname === link.href ||
                            (link.href !== "/dashboard" &&
                                link.href !== "/admin" &&
                                pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                    ? "bg-primary-600/10 text-primary-400 border border-primary-500/20 shadow-[inset_0_0_10px_rgba(79,70,229,0.1)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {link.icon}
                                </div>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onLogout();
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300 w-full"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
