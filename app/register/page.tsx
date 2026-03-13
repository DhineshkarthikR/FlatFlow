"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, ArrowRight, User, Home, Mail, Sparkles } from "lucide-react";
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    function handleGoogleLogin() {
        window.location.href = "/api/auth/google";
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
            {/* Animated Blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-600/10 rounded-full filter blur-[120px] animate-blob" />
            <div className="absolute top-[30%] right-[-8%] w-[350px] h-[350px] bg-[var(--accent-primary)]/10 rounded-full filter blur-[120px] animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-5%] left-[20%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full filter blur-[120px] animate-blob animation-delay-4000" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div
                className={`w-full max-w-[1200px] flex glass-card !bg-[var(--glass-bg)] !border-[var(--glass-border)] rounded-3xl overflow-hidden relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {/* Left panel - Branding */}
                <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-primary)] to-[var(--bg-surface)] border-r border-[var(--border-subtle)] p-12 flex-col justify-between overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-10 right-10 w-28 h-28 border border-[var(--border-subtle)] rounded-full" />
                    <div className="absolute bottom-16 left-6 w-16 h-16 border border-[var(--border-subtle)] rounded-full" />

                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-16 group">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[var(--accent-primary)] to-cyan-500 flex items-center justify-center shadow-lg shadow-[var(--accent-glow)] group-hover:scale-110 transition-transform">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-heading font-bold text-[var(--text-heading)]">FlatFlow</span>
                        </Link>

                        <div className="space-y-5 mb-12">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[var(--accent-primary)]" />
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)]">Get Started</span>
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-[var(--text-heading)] leading-[1.15]">
                                Join your society<br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] via-purple-400 to-cyan-400">
                                    on FlatFlow
                                </span>
                            </h2>
                            <p className="text-[var(--text-body)] text-base leading-relaxed max-w-sm">
                                Create your account to start managing complaints, making payments,
                                and staying connected with your community.
                            </p>
                        </div>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-3">
                        {[
                            { icon: User, title: "Personal Profile", desc: "Manage your own data" },
                            { icon: Home, title: "Property Management", desc: "Track all your flats" },
                            { icon: Mail, title: "Instant Alerts", desc: "Never miss a notice" },
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-4 p-3.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:bg-[var(--bg-surface-hover)] transition-colors">
                                <div className="w-9 h-9 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center shrink-0">
                                    <feature.icon className="h-4 w-4 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-heading)] text-sm font-semibold">{feature.title}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel - Form */}
                <div className="flex-1 p-8 sm:p-10 lg:p-14 flex flex-col justify-center bg-[var(--bg-primary)]/80 relative z-10 overflow-y-auto custom-scrollbar">
                    <div className="w-full max-w-lg mx-auto py-4">
                        {/* Mobile logo */}
                        <div className="lg:hidden flex items-center gap-3 mb-10">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[var(--accent-primary)] to-cyan-500 flex items-center justify-center shadow-[0_0_15px_var(--accent-glow)]">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold text-[var(--text-heading)]">FlatFlow</span>
                        </div>

                        <div className="mb-7">
                            <h1 className="text-3xl font-heading font-bold text-[var(--text-heading)] mb-2">Create Account</h1>
                            <p className="text-[var(--text-muted)] text-sm">Register as a resident to get started</p>
                        </div>

                        {error && (
                            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Google Sign Up */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 h-12 mb-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-heading)] font-semibold text-sm hover:bg-[var(--bg-surface-hover)] transition-all hover:scale-[1.01] shadow-md shadow-[var(--shadow-color)]"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--border-subtle)]" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-[var(--bg-primary)] text-[var(--text-muted)]">or register with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={form.name}
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
                            </div>

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    loading={loading}
                                    className="w-full h-12"
                                    size="lg"
                                >
                                    Create Account
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </form>

                        <p className="text-sm text-[var(--text-muted)] text-center mt-7">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-[var(--accent-primary)] font-semibold hover:underline transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
