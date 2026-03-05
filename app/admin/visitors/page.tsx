"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import { Plus, UserCheck } from "lucide-react";

interface Visitor {
    _id: string;
    visitorName: string;
    flatNumber: string;
    entryTime: string;
    exitTime?: string;
    [key: string]: unknown;
}

export default function AdminVisitorsPage() {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ visitorName: "", flatNumber: "" });

    useEffect(() => {
        fetchVisitors();
    }, []);

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

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/visitors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setVisitors([data.data, ...visitors]);
                setIsModalOpen(false);
                setForm({ visitorName: "", flatNumber: "" });
            }
        } catch (error) {
            console.error("Failed to add visitor:", error);
        } finally {
            setSubmitting(false);
        }
    }

    async function markExit(id: string) {
        try {
            const res = await fetch(`/api/visitors/${id}`, {
                method: "PATCH",
            });
            const data = await res.json();
            if (data.success) {
                setVisitors(
                    visitors.map((v) =>
                        v._id === id ? { ...v, exitTime: data.data.exitTime } : v
                    )
                );
            }
        } catch (error) {
            console.error("Failed to mark exit:", error);
        }
    }

    const columns = [
        { key: "visitorName", label: "Visitor" },
        { key: "flatNumber", label: "Flat No." },
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
        {
            key: "statusBadge",
            label: "Status",
            render: (item: Visitor) =>
                item.exitTime ? (
                    <Badge variant="default">Exited</Badge>
                ) : (
                    <Badge variant="success">Inside</Badge>
                ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item: Visitor) =>
                !item.exitTime ? (
                    <Button size="sm" variant="outline" onClick={() => markExit(item._id)}>
                        Mark Exit
                    </Button>
                ) : null,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-heading">Visitor Log</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Visitor
                </Button>
            </div>

            {loading ? (
                <LoadingSkeleton rows={8} />
            ) : visitors.length === 0 ? (
                <EmptyState
                    title="No visitors"
                    description="No visitor entries logged yet."
                    icon={<UserCheck className="h-12 w-12 text-gray-300 mb-4" />}
                />
            ) : (
                <Table columns={columns} data={visitors} />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Visitor Entry"
            >
                <form onSubmit={handleAdd} className="space-y-4">
                    <Input
                        label="Visitor Name"
                        placeholder="Full name"
                        value={form.visitorName}
                        onChange={(e) => setForm({ ...form, visitorName: e.target.value })}
                        required
                    />
                    <Input
                        label="Flat Number"
                        placeholder="e.g. A-101"
                        value={form.flatNumber}
                        onChange={(e) => setForm({ ...form, flatNumber: e.target.value })}
                        required
                    />
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" loading={submitting}>
                            Add Entry
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
