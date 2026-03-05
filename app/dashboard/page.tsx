"use client";

import { useEffect, useState } from "react";
import { MessageSquare, CreditCard, Bell, UserCheck } from "lucide-react";
import StatsCard from "@/components/ui/StatsCard";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";

interface DashboardData {
    complaints: Array<{
        _id: string;
        title: string;
        status: string;
        createdAt: string;
    }>;
    payments: Array<{
        _id: string;
        amount: number;
        status: string;
        createdAt: string;
    }>;
    notices: Array<{
        _id: string;
        title: string;
        createdAt: string;
    }>;
}

export default function ResidentDashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [complaintsRes, paymentsRes, noticesRes] = await Promise.all([
                    fetch("/api/complaints"),
                    fetch("/api/payments"),
                    fetch("/api/notices"),
                ]);
                const complaints = await complaintsRes.json();
                const payments = await paymentsRes.json();
                const notices = await noticesRes.json();

                setData({
                    complaints: complaints.data || [],
                    payments: payments.data || [],
                    notices: notices.data || [],
                });
            } catch (error) {
                console.error("Failed to load dashboard:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-heading">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    const totalComplaints = data?.complaints.length || 0;
    const pendingComplaints =
        data?.complaints.filter((c) => c.status === "pending").length || 0;
    const totalPayments = data?.payments.length || 0;
    const totalNotices = data?.notices.length || 0;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-heading">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Complaints"
                    value={totalComplaints}
                    icon={MessageSquare}
                    subtitle={`${pendingComplaints} pending`}
                />
                <StatsCard
                    title="Payments Made"
                    value={totalPayments}
                    icon={CreditCard}
                />
                <StatsCard
                    title="Notices"
                    value={totalNotices}
                    icon={Bell}
                />
                <StatsCard
                    title="Active Visitors"
                    value="-"
                    icon={UserCheck}
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Complaints</CardTitle>
                    </CardHeader>
                    {data?.complaints.length === 0 ? (
                        <p className="text-sm text-muted">No complaints yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {data?.complaints.slice(0, 5).map((c) => (
                                <div
                                    key={c._id}
                                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-heading">
                                            {c.title}
                                        </p>
                                        <p className="text-xs text-muted">
                                            {new Date(c.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <StatusBadge status={c.status} />
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Notices</CardTitle>
                    </CardHeader>
                    {data?.notices.length === 0 ? (
                        <p className="text-sm text-muted">No notices posted.</p>
                    ) : (
                        <div className="space-y-3">
                            {data?.notices.slice(0, 5).map((n) => (
                                <div
                                    key={n._id}
                                    className="py-2 border-b border-gray-100 last:border-0"
                                >
                                    <p className="text-sm font-medium text-heading">{n.title}</p>
                                    <p className="text-xs text-muted">
                                        {new Date(n.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
