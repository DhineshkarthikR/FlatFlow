"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "resident";
    flatNumber: string;
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.success) {
                    setUser(data.data);
                } else {
                    router.push("/login");
                }
            } catch {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [router]);

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-surface">
            <Sidebar role="resident" onLogout={handleLogout} />
            <Navbar userName={user.name} userRole={user.role} />
            <main className="ml-64 mt-16 p-6">{children}</main>
        </div>
    );
}
