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
    Building2,
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
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <Link href={role === "admin" ? "/admin" : "/dashboard"} className="flex items-center gap-2">
                        <Building2 className="h-7 w-7 text-primary-600" />
                        <span className="text-xl font-bold text-heading">FlatFlow</span>
                    </Link>
                    <button
                        className="lg:hidden p-2 text-muted hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary-50 text-primary-700"
                                    : "text-body hover:bg-gray-50"
                                    }`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onLogout();
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-body hover:bg-gray-50 transition-colors w-full"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
