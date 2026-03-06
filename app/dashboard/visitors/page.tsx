"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
const SectionIntro = dynamic(() => import("@/components/ui/SectionIntro"), { ssr: false });
import Table from "@/components/ui/Table";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { UserCheck } from "lucide-react";

interface Visitor {
    _id: string;
    visitorName: string;
    flatNumber: string;
    entryTime: string;
    exitTime?: string;
    [key: string]: unknown;
}

export default function VisitorsPage() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const handleIntroComplete = useCallback(() => setShowIntro(false), []);

    useEffect(() => {
        async function fetchVisitors() {
            try {
                const res = await fetch("/api/visitors");
                const data = await res.json();
                if (data.success) setVisitors(data.data);
            } catch (error) {
                console.error("Failed to fetch visitors:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchVisitors();
    }, []);

    const columns = [
        { key: "visitorName", label: "Visitor" },
        { key: "flatNumber", label: "Flat" },
        {
            key: "entryTime",
            label: "Entry",
            render: (item: Visitor) => new Date(item.entryTime).toLocaleString(),
        },
        {
            key: "exitTime",
            label: "Exit",
            render: (item: Visitor) =>
                item.exitTime ? new Date(item.exitTime).toLocaleString() : "—",
        },
    ];

    return (
        <>
            {showIntro && <SectionIntro theme="visitors" onComplete={handleIntroComplete} />}
            <div className={`space-y-6 transition-all duration-700 ${showIntro ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <h1 className="text-2xl font-bold text-heading">Visitor Log</h1>

                {loading ? (
                    <LoadingSkeleton rows={5} />
                ) : visitors.length === 0 ? (
                    <EmptyState
                        title="No visitors"
                        description="No visitors have been logged yet."
                        icon={<UserCheck className="h-12 w-12 text-gray-300 mb-4" />}
                    />
                ) : (
                    <Table columns={columns} data={visitors} />
                )}
            </div>
        </>
    );
}
