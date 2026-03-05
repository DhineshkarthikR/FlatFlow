"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";
import { Plus, Bell, Calendar } from "lucide-react";

interface Notice {
    _id: string;
    title: string;
    content: string;
    createdBy?: { name: string };
    createdAt: string;
}

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });

    useEffect(() => {
        fetchNotices();
    }, []);

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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/notices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setNotices([data.data, ...notices]);
                setIsModalOpen(false);
                setForm({ title: "", content: "" });
            }
        } catch (error) {
            console.error("Failed to create notice:", error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-heading">Manage Notices</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post Notice
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            ) : notices.length === 0 ? (
                <EmptyState
                    title="No notices"
                    description="Post your first notice to residents."
                    icon={<Bell className="h-12 w-12 text-gray-300 mb-4" />}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notices.map((notice) => (
                        <Card key={notice._id}>
                            <h3 className="text-base font-semibold text-heading mb-2">
                                {notice.title}
                            </h3>
                            <p className="text-sm text-body mb-3">{notice.content}</p>
                            <div className="flex items-center gap-2 text-xs text-muted">
                                <Calendar className="h-3 w-3" />
                                {new Date(notice.createdAt).toLocaleDateString()}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Post a Notice"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Title"
                        placeholder="Notice title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <Textarea
                        label="Content"
                        placeholder="Notice content..."
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
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
                            Post Notice
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
