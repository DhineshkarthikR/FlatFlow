"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, ArrowRight, User, Mail, Lock, Home } from "lucide-react";
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
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Animations */}
            <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-12 left-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

            <div className="w-full max-w-[1200px] flex glass-card rounded-3xl overflow-hidden relative z-10 min-h-[700px]">
                {/* Left panel - Branding/Info */}
                <div className="hidden lg:flex lg:w-5/12 bg-white/[0.02] border-r border-white/10 p-12 flex-col justify-between">
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-12 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-heading font-bold text-white">FlatFlow</span>
                        </Link>

                        <div className="space-y-6">
                            <h2 className="text-4xl font-heading font-bold text-white leading-tight" data-animate>
                                Join your society<br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-cyan-400">on FlatFlow</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed" data-animate>
                                Create your account to start managing complaints, making payments,
                                and staying connected with your housing community.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4" data-animate-stagger>
                        {[
                            { icon: User, title: "Personal Profile", desc: "Manage your own data" },
                            { icon: Home, title: "Property Management", desc: "Track all your flats" },
                            { icon: Mail, title: "Instant Alerts", desc: "Never miss a notice" }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                                    <feature.icon className="h-5 w-5 text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{feature.title}</p>
                                    <p className="text-xs text-gray-500">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel - Form */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center bg-[#0B0F19]/40 overflow-y-auto">
                    <div className="w-full max-w-lg mx-auto py-8">
                        <div className="lg:hidden flex items-center gap-3 mb-10">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold text-white">FlatFlow</span>
                        </div>

                        <div className="mb-8" data-animate>
                            <h1 className="text-3xl font-heading font-bold text-white mb-2">Create Account</h1>
                            <p className="text-gray-400">Register as a resident to get started</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl animate-shake">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4" data-animate-stagger>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="glass-input"
                                />
                                <Input
                                    label="Flat Number"
                                    name="flatNumber"
                                    placeholder="A-101"
                                    value={form.flatNumber}
                                    onChange={handleChange}
                                    required
                                    className="glass-input"
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
                                className="glass-input"
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
                                    className="glass-input"
                                />
                                <Input
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="glass-input"
                                />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    loading={loading}
                                    className="w-full h-12 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02]"
                                    size="lg"
                                >
                                    Create Account
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </form>

                        <p className="text-sm text-gray-500 text-center mt-8">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-primary-400 font-semibold hover:text-primary-300 underline underline-offset-4"
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
