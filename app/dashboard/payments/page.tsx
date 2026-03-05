"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import StatsCard from "@/components/ui/StatsCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { CreditCard, IndianRupee, CheckCircle2, Clock } from "lucide-react";

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    theme: { color: string };
}

interface RazorpayInstance {
    open: () => void;
}

interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface Payment {
    _id: string;
    amount: number;
    status: string;
    razorpayOrderId: string;
    createdAt: string;
    [key: string]: unknown;
}

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        fetchPayments();
        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

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

    async function handlePayment() {
        setPaying(true);
        try {
            const res = await fetch("/api/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (!data.success) {
                alert(data.message);
                setPaying(false);
                return;
            }

            const options: RazorpayOptions = {
                key: data.data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
                amount: data.data.amount * 100,
                currency: "INR",
                name: "FlatFlow",
                description: "Maintenance Fee Payment",
                order_id: data.data.orderId,
                handler: async function (response: RazorpayResponse) {
                    // Verify payment on backend
                    const verifyRes = await fetch("/api/payments/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response),
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("Payment successful!");
                        fetchPayments();
                    } else {
                        alert("Payment verification failed");
                    }
                },
                theme: { color: "#2563EB" },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to initiate payment");
        } finally {
            setPaying(false);
        }
    }

    const completedPayments = payments.filter((p) => p.status === "completed");
    const totalPaid = completedPayments.reduce((sum, p) => sum + p.amount, 0);

    const columns = [
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
            key: "razorpayOrderId",
            label: "Order ID",
            render: (item: Payment) => (
                <span className="text-xs font-mono text-muted">{item.razorpayOrderId}</span>
            ),
        },
        {
            key: "createdAt",
            label: "Date",
            render: (item: Payment) => new Date(item.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-heading">Payments</h1>
                <Button onClick={handlePayment} loading={paying}>
                    <IndianRupee className="h-4 w-4 mr-2" />
                    Pay Maintenance (₹5,000)
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard
                    title="Total Paid"
                    value={`₹${totalPaid.toLocaleString()}`}
                    icon={IndianRupee}
                />
                <StatsCard
                    title="Payments Made"
                    value={completedPayments.length}
                    icon={CheckCircle2}
                />
                <StatsCard
                    title="Pending"
                    value={payments.filter((p) => p.status === "pending").length}
                    icon={Clock}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                </CardHeader>
                {loading ? (
                    <LoadingSkeleton rows={5} />
                ) : (
                    <Table columns={columns} data={payments} emptyMessage="No payments yet" />
                )}
            </Card>
        </div>
    );
}
