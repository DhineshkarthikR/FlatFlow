"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
const SectionIntro = dynamic(() => import("@/components/ui/SectionIntro"), { ssr: false });
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import Table from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { Plus, MessageSquare, Image as ImageIcon, Check } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

interface Complaint {
    _id: string;
    title: string;
    description: string;
    status: string;
    imageUrl: string;
    createdAt: string;
    [key: string]: unknown;
}

export default function ComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ title: "", description: "", imageUrl: "" });
    const [showIntro, setShowIntro] = useState(true);
    const handleIntroComplete = useCallback(() => setShowIntro(false), []);

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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/complaints", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setComplaints([data.data, ...complaints]);
                setIsModalOpen(false);
                setForm({ title: "", description: "", imageUrl: "" });
            }
        } catch (error) {
            console.error("Failed to create complaint:", error);
        } finally {
            setSubmitting(false);
        }
    }

    const columns = [
        { key: "title", label: "Title" },
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
    ];

    return (
        <>
            {showIntro && <SectionIntro theme="complaints" onComplete={handleIntroComplete} />}
            <div className={`space-y-6 transition-all duration-700 ${showIntro ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-heading">My Complaints</h1>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Complaint
                    </Button>
                </div>

                {loading ? (
                    <LoadingSkeleton rows={5} />
                ) : complaints.length === 0 ? (
                    <EmptyState
                        title="No complaints"
                        description="You haven't raised any complaints yet."
                        icon={<MessageSquare className="h-12 w-12 text-gray-300 mb-4" />}
                    />
                ) : (
                    <Table columns={columns} data={complaints} />
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Raise a Complaint"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Title"
                            placeholder="Brief title for the issue"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                        <Textarea
                            label="Description"
                            placeholder="Describe the issue in detail..."
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            required
                        />
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-heading">
                                Attach Photo / Proof (optional)
                            </label>
                            <div className="w-full">
                                {form.imageUrl ? (
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                                        <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                                            <Check className="h-5 w-5" />
                                            <span>Image successfully uploaded</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setForm({ ...form, imageUrl: "" })}
                                            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <UploadDropzone
                                        endpoint="complaintImage"
                                        onClientUploadComplete={(res) => {
                                            if (res?.[0]) {
                                                setForm({ ...form, imageUrl: res[0].url });
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                        appearance={{
                                            container: "w-full border-2 border-dashed border-white/10 hover:border-primary-500/50 bg-white/5 transition-colors duration-200 rounded-xl p-8 cursor-pointer flex flex-col items-center justify-center gap-2",
                                            label: "text-sm text-white hover:text-primary-400 font-medium",
                                            allowedContent: "text-xs text-gray-400 mt-1",
                                            button: "bg-primary-600 text-white hover:bg-primary-500 rounded-lg text-sm px-5 py-2.5 mt-4 transition-colors font-medium ut-uploading:bg-primary-400 ut-uploading:cursor-not-allowed",
                                            uploadIcon: "text-white/50 w-10 h-10 mb-3",
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                type="button"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" loading={submitting}>
                                Submit Complaint
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
}
