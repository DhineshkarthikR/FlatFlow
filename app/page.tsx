import Link from "next/link";
import {
    Building2,
    MessageSquare,
    CreditCard,
    UserCheck,
    BarChart3,
    Shield,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

const features = [
    {
        icon: MessageSquare,
        title: "Complaint Management",
        description:
            "Raise, track, and resolve maintenance complaints with real-time status updates and image attachments.",
    },
    {
        icon: CreditCard,
        title: "Online Payments",
        description:
            "Pay maintenance fees securely via Razorpay with instant receipt generation and payment history.",
    },
    {
        icon: UserCheck,
        title: "Visitor Logs",
        description:
            "Track all visitor entries and exits with timestamps for enhanced community security.",
    },
    {
        icon: BarChart3,
        title: "Reports & Analytics",
        description:
            "Comprehensive dashboards with revenue tracking, expense reports, and occupancy metrics.",
    },
    {
        icon: Shield,
        title: "Secure Access",
        description:
            "Role-based access control with encrypted authentication and protected admin routes.",
    },
    {
        icon: Building2,
        title: "Event Booking",
        description:
            "Book clubhouse and community facilities with conflict detection and calendar management.",
    },
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-7 w-7 text-primary-600" />
                            <span className="text-xl font-bold text-heading">FlatFlow</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-body hover:text-heading transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
                        <CheckCircle2 className="h-4 w-4" />
                        Trusted by 500+ Housing Societies
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading leading-tight mb-6 max-w-4xl mx-auto">
                        Modern Apartment Society{" "}
                        <span className="text-primary-600">Management</span> Platform
                    </h1>
                    <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
                        Streamline your housing society operations — from complaints and
                        payments to visitor logs and event bookings — all in one
                        professional platform.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                        >
                            Start Free Trial
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/login"
                            className="px-6 py-3 text-base font-medium text-body border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-heading mb-4">
                            Everything You Need to Manage Your Society
                        </h2>
                        <p className="text-muted max-w-xl mx-auto">
                            A complete suite of tools designed for modern housing society
                            management.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="h-10 w-10 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="h-5 w-5 text-primary-600" />
                                </div>
                                <h3 className="text-base font-semibold text-heading mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "500+", label: "Societies" },
                            { value: "50,000+", label: "Residents" },
                            { value: "₹2Cr+", label: "Payments Processed" },
                            { value: "99.9%", label: "Uptime" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-3xl font-bold text-primary-600 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-muted">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-heading">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Society Management?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Join hundreds of housing societies that trust FlatFlow for
                        streamlined operations.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-heading bg-white hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Get Started for Free
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Building2 className="h-6 w-6 text-primary-500" />
                                <span className="text-xl font-bold text-white">FlatFlow</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                Streamlining housing society operations with modern, secure, and intuitive tools.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
                            <ul className="space-y-3">
                                <li><Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="#security" className="text-sm text-gray-400 hover:text-white transition-colors">Security</Link></li>
                                <li><Link href="#updates" className="text-sm text-gray-400 hover:text-white transition-colors">Updates</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li><Link href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="#careers" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                                <li><Link href="#blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li><Link href="#privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                                <li><Link href="#cookies" className="text-sm text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
                        <p className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} FlatFlow. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors text-sm">Twitter</span>
                            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors text-sm">LinkedIn</span>
                            <span className="text-gray-400 hover:text-white cursor-pointer transition-colors text-sm">GitHub</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
