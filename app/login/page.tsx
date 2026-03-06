"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Building2, ArrowRight, Shield, CreditCard, Bell, Users, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const err = searchParams.get("error");
        if (err) {
            setError(err === "token_failed" ? "Google authentication failed. Please try again."
                : err === "no_email" ? "Could not retrieve email from Google."
                    : err === "auth_failed" ? "Authentication failed. Please try again."
                        : "An error occurred. Please try again.");
        }
    }, [searchParams]);

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

    function handleGoogleLogin() {
        window.location.href = "/api/auth/google";
    }

    const features = [
        { icon: Shield, label: "Secure" },
        { icon: CreditCard, label: "Payments" },
        { icon: Bell, label: "Notices" },
        { icon: Users, label: "Community" },
    ];

    return (
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary-600/30 rounded-full filter blur-[120px] animate-blob" />
            <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-purple-600/25 rounded-full filter blur-[120px] animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[30%] w-[350px] h-[350px] bg-cyan-500/20 rounded-full filter blur-[120px] animate-blob animation-delay-4000" />

            {/* Floating grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div
                className={`w-full max-w-[1100px] flex glass-card rounded-3xl overflow-hidden relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                {/* Left panel - Branding */}
                <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-primary-900/40 via-[#0B0F19] to-cyan-900/30 border-r border-white/5 p-12 flex-col justify-between overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-8 right-8 w-32 h-32 border border-white/5 rounded-full" />
                    <div className="absolute top-4 right-4 w-40 h-40 border border-white/[0.03] rounded-full" />
                    <div className="absolute bottom-12 left-8 w-20 h-20 border border-white/5 rounded-full" />

                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-16 group">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-primary-600/30 group-hover:scale-110 transition-transform">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-heading font-bold text-white">FlatFlow</span>
                        </Link>

                        <div className="space-y-5">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-primary-400" />
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">Society Management</span>
                            </div>
                            <h2 className="text-4xl font-heading font-bold text-white leading-[1.15]">
                                Welcome back to<br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-purple-400 to-cyan-400">
                                    your community
                                </span>
                            </h2>
                            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                                Manage complaints, track payments, and stay updated with your
                                housing society — all in one place.
                            </p>
                        </div>
                    </div>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-3">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-xs text-gray-300 hover:bg-white/[0.08] transition-colors"
                            >
                                <f.icon className="h-3.5 w-3.5 text-primary-400" />
                                {f.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel - Form */}
                <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-[#0B0F19]/60">
                    <div className="w-full max-w-sm mx-auto">
                        {/* Mobile logo */}
                        <div className="lg:hidden flex items-center gap-3 mb-10">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold text-white">FlatFlow</span>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl font-heading font-bold text-white mb-2">Sign In</h1>
                            <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
                        </div>

                        {error && (
                            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Google Sign In */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 h-12 mb-6 rounded-xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-100 transition-all hover:scale-[1.01] shadow-lg"
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
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-[#0B0F19]/60 text-gray-500">or sign in with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <div className="flex items-center justify-end">
                                <Link href="#" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-600/25 transition-all hover:scale-[1.02] hover:shadow-primary-600/40"
                                size="lg"
                            >
                                Sign In
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>

                        <p className="text-sm text-gray-500 text-center mt-8">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-primary-400 font-semibold hover:text-primary-300 transition-colors"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0B0F19]" />}>
            <LoginForm />
        </Suspense>
    );
}
