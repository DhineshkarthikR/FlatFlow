"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { MessageSquare, CheckCircle2, Eye } from "lucide-react";

interface Complaint {
    _id: string;
    title: string;
    description: string;
    status: string;
    residentId?: { name: string; email: string; flatNumber: string };
    createdAt: string;
    [key: string]: unknown;
}

export default function AdminComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComplaints();
    }, []);

    async function fetchComplaints() {
        try {
            const res = await fetch("/api/complaints");
            const data = await res.json();
            if (data.success) setComplaints(data.data);
        } catch (error) {
            console.error("Failed to fetch complaints:", error);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            const res = await fetch(`/api/complaints/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                setComplaints(
                    complaints.map((c) =>
                        c._id === id ? { ...c, status: data.data.status } : c
                    )
                );
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    }

    const columns = [
        { key: "title", label: "Title" },
        {
            key: "residentId",
            label: "Resident",
            render: (item: Complaint) =>
                item.residentId
                    ? `${item.residentId.name} (${item.residentId.flatNumber})`
                    : "—",
        },
        {
            key: "status",
            label: "Status",
            render: (item: Complaint) => <StatusBadge status={item.status} />,
        },
        {
            key: "createdAt",
            label: "Date",
            render: (item: Complaint) =>
                new Date(item.createdAt).toLocaleDateString(),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item: Complaint) => (
                <div className="flex items-center gap-2">
                    {item.status === "pending" && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(item._id, "approved")}
                        >
                            Approve
                        </Button>
                    )}
                    {(item.status === "pending" || item.status === "approved") && (
                        <Button
                            size="sm"
                            onClick={() => updateStatus(item._id, "resolved")}
                        >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Resolve
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-heading">Manage Complaints</h1>

            {loading ? (
                <LoadingSkeleton rows={8} />
            ) : complaints.length === 0 ? (
                <EmptyState
                    title="No complaints"
                    description="No complaints have been raised yet."
                    icon={<MessageSquare className="h-12 w-12 text-gray-300 mb-4" />}
                />
            ) : (
                <Table columns={columns} data={complaints} />
            )}
        </div>
    );
}
