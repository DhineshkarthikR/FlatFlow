"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
const SectionIntro = dynamic(() => import("@/components/ui/SectionIntro"), { ssr: false });
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { Textarea, Select } from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { Plus, Calendar } from "lucide-react";

interface EventItem {
    _id: string;
    title: string;
    description: string;
    date: string;
    facility: string;
    status: string;
    bookedBy?: { name: string; flatNumber: string };
    [key: string]: unknown;
}

const facilities = [
    { value: "Clubhouse", label: "Clubhouse" },
    { value: "Community Hall", label: "Community Hall" },
    { value: "Swimming Pool", label: "Swimming Pool" },
    { value: "Gym", label: "Gym" },
    { value: "Terrace", label: "Terrace" },
];

export default function BookingsPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        facility: "Clubhouse",
    });
    const [error, setError] = useState("");
    const [showIntro, setShowIntro] = useState(true);
    const handleIntroComplete = useCallback(() => setShowIntro(false), []);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        try {
            const res = await fetch("/api/events");
            const data = await res.json();
            if (data.success) setEvents(data.data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setEvents([data.data, ...events]);
                setIsModalOpen(false);
                setForm({ title: "", description: "", date: "", facility: "Clubhouse" });
            } else {
                setError(data.message);
            }
        } catch {
            setError("Failed to create booking");
        } finally {
            setSubmitting(false);
        }
    }

    const columns = [
        { key: "title", label: "Event" },
        { key: "facility", label: "Facility" },
        {
            key: "date",
            label: "Date",
            render: (item: EventItem) => new Date(item.date).toLocaleString(),
        },
        {
            key: "status",
            label: "Status",
            render: (item: EventItem) => <StatusBadge status={item.status} />,
        },
    ];

    return (
        <>
            {showIntro && <SectionIntro theme="bookings" onComplete={handleIntroComplete} />}
            <div className={`space-y-6 transition-all duration-700 ${showIntro ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-heading">Event Bookings</h1>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Book Facility
                    </Button>
                </div>

                {loading ? (
                    <LoadingSkeleton rows={5} />
                ) : events.length === 0 ? (
                    <EmptyState
                        title="No bookings"
                        description="You haven't made any event bookings yet."
                        icon={<Calendar className="h-12 w-12 text-gray-300 mb-4" />}
                    />
                ) : (
                    <Table columns={columns} data={events} />
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Book a Facility"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                                {error}
                            </div>
                        )}
                        <Input
                            label="Event Title"
                            placeholder="e.g. Birthday Party"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                        <Textarea
                            label="Description"
                            placeholder="Details about the event"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                        />
                        <Select
                            label="Facility"
                            options={facilities}
                            value={form.facility}
                            onChange={(e) => setForm({ ...form, facility: e.target.value })}
                        />
                        <Input
                            label="Date & Time"
                            type="datetime-local"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
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
                                Book
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
}
