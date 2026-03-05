"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";
import { Bell, Calendar } from "lucide-react";

interface Notice {
    _id: string;
    title: string;
    content: string;
    createdBy?: { name: string };
    createdAt: string;
}

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNotices() {
            try {
                const res = await fetch("/api/notices");
                const data = await res.json();
                if (data.success) setNotices(data.data);
            } catch (error) {
                console.error("Failed to fetch notices:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchNotices();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-heading">Notices</h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            ) : notices.length === 0 ? (
                <EmptyState
                    title="No notices"
                    description="There are no notices posted yet."
                    icon={<Bell className="h-12 w-12 text-gray-300 mb-4" />}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notices.map((notice) => (
                        <Card key={notice._id}>
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                                    <Bell className="h-5 w-5 text-primary-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold text-heading mb-1">
                                        {notice.title}
                                    </h3>
                                    <p className="text-sm text-body leading-relaxed mb-3">
                                        {notice.content}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-muted">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(notice.createdAt).toLocaleDateString()}
                                        </span>
                                        {notice.createdBy && (
                                            <span>by {notice.createdBy.name}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
