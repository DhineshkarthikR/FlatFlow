"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ProfileSettingsProps {
    userRole: "admin" | "resident";
}

export default function ProfileSettings({ userRole }: ProfileSettingsProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ type: "error", text: "New passwords do not match" });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/profile/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                })
            });

            const data = await res.json();
            if (data.success) {
                setMessage({ type: "success", text: "Password updated successfully" });
                setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setMessage({ type: "error", text: data.message || "Failed to update password" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

        setDeleteLoading(true);
        try {
            const res = await fetch("/api/auth/profile", {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.success) {
                router.push("/login");
            } else {
                setMessage({ type: "error", text: data.message || "Failed to delete account" });
                setDeleteLoading(false);
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong" });
            setDeleteLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 py-6">
            <h1 className="text-2xl font-bold text-heading mb-6">Profile Settings</h1>

            {message.text && (
                <div className={`p-4 rounded-lg mb-6 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                    {message.text}
                </div>
            )}

            <Card className="!p-6">
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <Input
                        label="Current Password"
                        type="password"
                        required
                        value={passwords.currentPassword}
                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    />
                    <Input
                        label="New Password"
                        type="password"
                        required
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    />
                    <Input
                        label="Confirm New Password"
                        type="password"
                        required
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    />
                    <div className="pt-2">
                        <Button type="submit" loading={loading} className="w-full sm:w-auto">
                            Update Password
                        </Button>
                    </div>
                </form>
            </Card>

            <Card className="!p-6">
                <CardHeader>
                    <CardTitle className="text-red-600">Delete Account</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                    <p className="text-sm text-body">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button
                        type="button"
                        variant="danger"
                        loading={deleteLoading}
                        onClick={handleDeleteAccount}
                    >
                        Delete My Account
                    </Button>
                </div>
            </Card>
        </div>
    );
}
