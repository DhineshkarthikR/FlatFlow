"use client";

import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import StatsCard from "@/components/ui/StatsCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { IndianRupee, CheckCircle2, Clock, XCircle } from "lucide-react";

interface Payment {
    _id: string;
    amount: number;
    status: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    residentId?: { name: string; flatNumber: string };
    createdAt: string;
    [key: string]: unknown;
}

export default function AdminPaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPayments() {
            try {
                const res = await fetch("/api/payments");
                const data = await res.json();
                if (data.success) setPayments(data.data);
            } catch (error) {
                console.error("Failed to fetch payments:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPayments();
    }, []);

    const completed = payments.filter((p) => p.status === "completed");
    const pending = payments.filter((p) => p.status === "pending");
    const failed = payments.filter((p) => p.status === "failed");
    const totalRevenue = completed.reduce((sum, p) => sum + p.amount, 0);

    const columns = [
        {
            key: "residentId",
            label: "Resident",
            render: (item: Payment) =>
                item.residentId
                    ? `${item.residentId.name} (${item.residentId.flatNumber})`
                    : "—",
        },
        {
            key: "amount",
            label: "Amount",
            render: (item: Payment) => `₹${item.amount.toLocaleString()}`,
        },
        {
            key: "status",
            label: "Status",
            render: (item: Payment) => <StatusBadge status={item.status} />,
        },
        {
            key: "razorpayPaymentId",
            label: "Payment ID",
            render: (item: Payment) => (
                <span className="text-xs font-mono text-muted">
                    {item.razorpayPaymentId || "—"}
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Date",
            render: (item: Payment) =>
                new Date(item.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-heading">Payment Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Revenue"
                    value={`₹${totalRevenue.toLocaleString()}`}
                    icon={IndianRupee}
                />
                <StatsCard
                    title="Completed"
                    value={completed.length}
                    icon={CheckCircle2}
                />
                <StatsCard title="Pending" value={pending.length} icon={Clock} />
                <StatsCard title="Failed" value={failed.length} icon={XCircle} />
            </div>

            {loading ? (
                <LoadingSkeleton rows={8} />
            ) : (
                <Table
                    columns={columns}
                    data={payments}
                    emptyMessage="No payments recorded"
                />
            )}
        </div>
    );
}
