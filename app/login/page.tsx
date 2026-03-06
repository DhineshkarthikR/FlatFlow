"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
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
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Animations */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

            <div className="w-full max-w-[1100px] flex glass-card rounded-3xl overflow-hidden relative z-10">
                {/* Left panel - Branding/Info */}
                <div className="hidden lg:flex lg:w-1/2 bg-white/[0.02] border-r border-white/10 p-12 flex-col justify-between">
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-12 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-heading font-bold text-white">FlatFlow</span>
                        </Link>

                        <div className="space-y-6">
                            <h2 className="text-4xl font-heading font-bold text-white leading-tight" data-animate>
                                Welcome back to<br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-cyan-400">your community portal</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md" data-animate>
                                Manage complaints, track payments, and stay updated with your
                                housing society activities — all in one unified experience.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4" data-animate-stagger>
                        {[
                            { label: "Active Residents", value: "2.4k+" },
                            { label: "Societies joined", value: "500+" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel - Form */}
                <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center bg-[#0B0F19]/40">
                    <div className="w-full max-w-sm mx-auto">
                        <div className="lg:hidden flex items-center gap-3 mb-12">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold text-white text-balance">FlatFlow</span>
                        </div>

                        <div className="mb-10" data-animate>
                            <h1 className="text-3xl font-heading font-bold text-white mb-2">Sign In</h1>
                            <p className="text-gray-400">Enter your credentials to access your account</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl animate-shake">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5" data-animate-stagger>
                            <div className="space-y-2">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="glass-input"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="sr-only">Password</label>
                                </div>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="glass-input"
                                />
                            </div>

                            <div className="flex items-center justify-end text-sm">
                                <Link href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full h-12 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02]"
                                size="lg"
                            >
                                Sign In
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors">
                                    <Chrome className="h-4 w-4" />
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 h-11 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors">
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </button>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 text-center mt-10">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-primary-400 font-semibold hover:text-primary-300 underline underline-offset-4"
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
