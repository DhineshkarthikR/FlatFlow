"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Mail, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                setLoading(false);
                return;
            }

            if (data.data.user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
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
                        <span className="text-2xl font-bold text-white">FlatFlow</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Welcome back to your society portal
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Manage complaints, track payments, and stay updated with your
                        housing society activities — all in one place.
                    </p>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <Building2 className="h-7 w-7 text-primary-600" />
                        <span className="text-xl font-bold text-heading">FlatFlow</span>
                    </div>

                    <h1 className="text-2xl font-bold text-heading mb-2">Sign In</h1>
                    <p className="text-muted mb-8">
                        Enter your credentials to access your account
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            loading={loading}
                            className="w-full"
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </form>

                    <p className="text-sm text-muted text-center mt-6">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-primary-600 font-medium hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
