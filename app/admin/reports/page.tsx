"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { Textarea, Select } from "@/components/ui/Input";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import StatsCard from "@/components/ui/StatsCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { Plus, Receipt, IndianRupee, TrendingDown } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface Expense {
    _id: string;
    title: string;
    amount: number;
    category: string;
    description: string;
    createdAt: string;
    [key: string]: unknown;
}

const categories = [
    { value: "Maintenance", label: "Maintenance" },
    { value: "Security", label: "Security" },
    { value: "Utilities", label: "Utilities" },
    { value: "Cleaning", label: "Cleaning" },
    { value: "Repairs", label: "Repairs" },
    { value: "Other", label: "Other" },
];

const COLORS = ["#2563EB", "#059669", "#D97706", "#DC2626", "#7C3AED", "#6B7280"];

export default function AdminReportsPage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "Maintenance",
        description: "",
    });

    useEffect(() => {
        fetchExpenses();
    }, []);

    async function fetchExpenses() {
        try {
            const res = await fetch("/api/expenses");
            const data = await res.json();
            if (data.success) setExpenses(data.data);
        } catch (error) {
            console.error("Failed to fetch expenses:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/expenses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    amount: parseFloat(form.amount),
                }),
            });
            const data = await res.json();
            if (data.success) {
                setExpenses([data.data, ...expenses]);
                setIsModalOpen(false);
                setForm({ title: "", amount: "", category: "Maintenance", description: "" });
            }
        } catch (error) {
            console.error("Failed to create expense:", error);
        } finally {
            setSubmitting(false);
        }
    }

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Category breakdown
    const categoryData = Object.entries(
        expenses.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] || 0) + e.amount;
            return acc;
        }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));

    // Monthly expenses
    const monthlyData = Object.entries(
        expenses.reduce((acc, e) => {
            const month = new Date(e.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
            acc[month] = (acc[month] || 0) + e.amount;
            return acc;
        }, {} as Record<string, number>)
    )
        .map(([month, amount]) => ({ month, amount }))
        .reverse()
        .slice(-6);

    const columns = [
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        {
            key: "amount",
            label: "Amount",
            render: (item: Expense) => `₹${item.amount.toLocaleString()}`,
        },
        {
            key: "createdAt",
            label: "Date",
            render: (item: Expense) =>
                new Date(item.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-heading">Expense Reports</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                    title="Total Expenses"
                    value={`₹${totalExpenses.toLocaleString()}`}
                    icon={TrendingDown}
                />
                <StatsCard
                    title="Entries"
                    value={expenses.length}
                    icon={Receipt}
                />
                <StatsCard
                    title="Categories"
                    value={categoryData.length}
                    icon={IndianRupee}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Expenses</CardTitle>
                    </CardHeader>
                    <div className="h-64">
                        {monthlyData.length === 0 ? (
                            <p className="text-sm text-muted text-center py-8">No data yet</p>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis dataKey="month" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip />
                                    <Bar dataKey="amount" fill="#2563EB" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Category Breakdown</CardTitle>
                    </CardHeader>
                    <div className="h-64 flex items-center justify-center">
                        {categoryData.length === 0 ? (
                            <p className="text-sm text-muted">No data yet</p>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((_, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2">
                        {categoryData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted">
                                <div
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                {entry.name}: ₹{entry.value.toLocaleString()}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Table */}
            {loading ? (
                <LoadingSkeleton rows={5} />
            ) : (
                <Table
                    columns={columns}
                    data={expenses}
                    emptyMessage="No expenses recorded"
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add Expense"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Title"
                        placeholder="e.g. Electricity Bill"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <Input
                        label="Amount (₹)"
                        type="number"
                        placeholder="5000"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        required
                    />
                    <Select
                        label="Category"
                        options={categories}
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                    <Textarea
                        label="Description (optional)"
                        placeholder="Additional details"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                            Add Expense
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
