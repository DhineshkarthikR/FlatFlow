"use client";

import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import StatsCard from "@/components/ui/StatsCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { Users, Building2 } from "lucide-react";

interface Resident {
    _id: string;
    name: string;
    email: string;
    flatNumber: string;
    createdAt: string;
    [key: string]: unknown;
}

export default function AdminResidentsPage() {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResidents() {
            try {
                const res = await fetch("/api/residents");
                const data = await res.json();
                if (data.success) setResidents(data.data);
            } catch (error) {
                console.error("Failed to fetch residents:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchResidents();
    }, []);

    const columns = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "flatNumber", label: "Flat No." },
        {
            key: "createdAt",
            label: "Joined",
            render: (item: Resident) =>
                new Date(item.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-heading">Residents</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatsCard
                    title="Total Residents"
                    value={residents.length}
                    icon={Users}
                />
                <StatsCard
                    title="Unique Flats"
                    value={new Set(residents.map((r) => r.flatNumber)).size}
                    icon={Building2}
                />
            </div>

            {loading ? (
                <LoadingSkeleton rows={8} />
            ) : residents.length === 0 ? (
                <EmptyState
                    title="No residents"
                    description="No residents have registered yet."
                    icon={<Users className="h-12 w-12 text-gray-300 mb-4" />}
                />
            ) : (
                <Table columns={columns} data={residents} />
            )}
        </div>
    );
}
