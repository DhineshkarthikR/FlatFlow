"use client";

import { useEffect, useState } from "react";
import {
    Users,
    MessageSquare,
    IndianRupee,
    AlertTriangle,
    UserCheck,
} from "lucide-react";
import StatsCard from "@/components/ui/StatsCard";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface AnalyticsData {
    totalResidents: number;
    totalComplaints: number;
    pendingComplaints: number;
    resolvedComplaints: number;
    totalRevenue: number;
    totalVisitors: number;
    monthlyRevenue: Array<{ month: string; revenue: number }>;
    recentComplaints: Array<{
        _id: string;
        title: string;
        status: string;
        residentId?: { name: string; flatNumber: string };
        createdAt: string;
    }>;
    recentPayments: Array<{
        _id: string;
        amount: number;
        residentId?: { name: string; flatNumber: string };
        createdAt: string;
    }>;
}

const COLORS = ["#2563EB", "#059669", "#D97706", "#DC2626"];

export default function AdminDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const res = await fetch("/api/analytics");
                const result = await res.json();
                if (result.success) setData(result.data);
            } catch (error) {
                console.error("Failed to load analytics:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-heading">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    const complaintsPieData = [
        { name: "Pending", value: data?.pendingComplaints || 0 },
        { name: "Resolved", value: data?.resolvedComplaints || 0 },
        {
            name: "In Progress",
            value:
                (data?.totalComplaints || 0) -
                (data?.pendingComplaints || 0) -
                (data?.resolvedComplaints || 0),
        },
    ].filter((d) => d.value > 0);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-heading">Admin Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Revenue"
                    value={`₹${(data?.totalRevenue || 0).toLocaleString()}`}
                    icon={IndianRupee}
                />
                <StatsCard
                    title="Residents"
                    value={data?.totalResidents || 0}
                    icon={Users}
                />
                <StatsCard
                    title="Pending Complaints"
                    value={data?.pendingComplaints || 0}
                    icon={AlertTriangle}
                />
                <StatsCard
                    title="Total Visitors"
                    value={data?.totalVisitors || 0}
                    icon={UserCheck}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                    </CardHeader>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data?.monthlyRevenue || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#2563EB"
                                    fill="#DBEAFE"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Complaints Overview</CardTitle>
                    </CardHeader>
                    <div className="h-64 flex items-center justify-center">
                        {complaintsPieData.length === 0 ? (
                            <p className="text-sm text-muted">No complaint data</p>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={complaintsPieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {complaintsPieData.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                        {complaintsPieData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted">
                                <div
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                {entry.name}: {entry.value}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Complaints</CardTitle>
                    </CardHeader>
                    {(data?.recentComplaints?.length || 0) === 0 ? (
                        <p className="text-sm text-muted">No recent complaints</p>
                    ) : (
                        <div className="space-y-3">
                            {data?.recentComplaints.map((c) => (
                                <div
                                    key={c._id}
                                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-heading">{c.title}</p>
                                        <p className="text-xs text-muted">
                                            {c.residentId?.name} • {c.residentId?.flatNumber}
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
                        <CardTitle>Recent Payments</CardTitle>
                    </CardHeader>
                    {(data?.recentPayments?.length || 0) === 0 ? (
                        <p className="text-sm text-muted">No recent payments</p>
                    ) : (
                        <div className="space-y-3">
                            {data?.recentPayments.map((p) => (
                                <div
                                    key={p._id}
                                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-heading">
                                            ₹{p.amount.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-muted">
                                            {p.residentId?.name} • {p.residentId?.flatNumber}
                                        </p>
                                    </div>
                                    <span className="text-xs text-muted">
                                        {new Date(p.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
