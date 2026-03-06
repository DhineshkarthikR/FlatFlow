"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        flatNumber: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // Exclude confirmPassword from the API request payload
            const { confirmPassword, ...registerData } = form;
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                setLoading(false);
                return;
            }

            router.push("/dashboard");
        } catch {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-surface flex">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-heading items-center justify-center p-12">
                <div className="max-w-md">
                    <div className="flex items-center gap-2 mb-8">
                        <Building2 className="h-8 w-8 text-white" />
                        <span className="text-xl font-bold text-white">FlatFlow</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Join your society on FlatFlow
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Create your account to start managing complaints, making payments,
                        and staying connected with your housing community.
                    </p>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-2 mb-8 mt-8">
                        <Building2 className="h-7 w-7 text-primary-600" />
                        <span className="text-xl font-bold text-heading">FlatFlow</span>
                    </div>

                    <h1 className="text-2xl font-bold text-heading mb-2">
                        Create Account
                    </h1>
                    <p className="text-muted mb-8">
                        Register as a resident to get started
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Flat Number"
                            name="flatNumber"
                            placeholder="A-101"
                            value={form.flatNumber}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <Button
                            type="submit"
                            loading={loading}
                            className="w-full mt-2"
                            size="lg"
                        >
                            Create Account
                        </Button>
                    </form>

                    <p className="text-sm text-muted text-center mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary-600 font-medium hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
