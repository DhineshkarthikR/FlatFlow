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
    Zap,
    Users,
    Activity,
    IndianRupee
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
        icon: Activity,
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
        <div className="min-h-screen bg-[#0B0F19] selection:bg-primary-500/30 font-sans text-gray-300 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/20 blur-[120px] rounded-full animate-pulse-glow" />
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-primary-900/40 blur-[150px] rounded-full" />
            </div>

            {/* Navbar */}
            <nav className="fixed w-full top-0 z-50 border-b border-white/10 bg-[#0B0F19]/60 backdrop-blur-xl transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-cyan-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">FlatFlow</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="relative group overflow-hidden rounded-lg p-[1px]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-cyan-500 to-primary-600 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300 bg-[length:200%_auto] animate-[gradient_2s_linear_infinite]" />
                                <div className="relative flex items-center gap-2 px-6 py-2.5 bg-[#0B0F19] rounded-lg transition-all duration-300 group-hover:bg-opacity-0">
                                    <span className="text-sm font-medium text-white">Start Building</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-medium mb-8 animate-fade-in-up opacity-0 backdrop-blur-sm" style={{ animationDelay: '100ms' }}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        FlatFlow 2.0 is now live
                    </div>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-8 max-w-5xl mx-auto tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: '300ms' }}>
                        Build Better.<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-cyan-400 to-indigo-400 drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]">Launch Faster.</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in-up opacity-0 font-light" style={{ animationDelay: '500ms' }}>
                        Streamline your housing society operations visually.
                        From complaints and payments to visitor logs and event bookings — build an intuitive experience for your community.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up opacity-0" style={{ animationDelay: '700ms' }}>
                        <Link
                            href="/register"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-all duration-300 shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] hover:-translate-y-1"
                        >
                            Start for free
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#features"
                            className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            View Features
                        </Link>
                    </div>

                    {/* Dashboard Preview Mockup */}
                    <div className="mt-20 lg:mt-32 relative mx-auto max-w-6xl animate-fade-in-up opacity-0" style={{ animationDelay: '900ms' }}>
                        <div className="relative rounded-2xl border border-white/10 bg-[#131A2A]/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-2 sm:p-4 animate-float aspect-video overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-cyan-500/5 pointer-events-none" />

                            {/* Detailed mockup UI */}
                            <div className="h-full w-full rounded-xl bg-[#0B0F19]/90 border border-white/10 flex flex-col overflow-hidden relative backdrop-blur-3xl shadow-2xl">
                                {/* Browser/Window Header */}
                                <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-white/5 relative z-10">
                                    <div className="flex gap-2">
                                        <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 bg-black/40 rounded-md h-7 w-1/3 flex items-center justify-center border border-white/5">
                                        <span className="text-[10px] text-gray-500 font-mono tracking-widest flex items-center gap-2">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                            admin.flatflow.io
                                        </span>
                                    </div>
                                </div>

                                {/* App Content */}
                                <div className="flex-1 flex overflow-hidden">
                                    {/* Sidebar */}
                                    <div className="w-48 xl:w-56 border-r border-white/10 bg-white/[0.02] p-4 flex flex-col gap-2 relative z-10">
                                        <div className="flex items-center gap-2 mb-6 px-2">
                                            <div className="w-6 h-6 rounded bg-gradient-to-tr from-primary-600 to-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(79,70,229,0.5)]">
                                                <Building2 className="w-3.5 h-3.5 text-white" />
                                            </div>
                                            <span className="text-sm font-bold text-white">FlatFlow</span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-600/20 text-primary-400 border border-primary-500/30 shadow-[inset_0_0_10px_rgba(79,70,229,0.1)]">
                                                <BarChart3 className="w-4 h-4" />
                                                <span className="text-xs font-medium">Dashboard</span>
                                            </div>
                                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 opacity-80">
                                                <MessageSquare className="w-4 h-4" />
                                                <span className="text-xs font-medium">Complaints</span>
                                            </div>
                                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 opacity-80">
                                                <CreditCard className="w-4 h-4" />
                                                <span className="text-xs font-medium">Payments</span>
                                            </div>
                                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 opacity-80">
                                                <Users className="w-4 h-4" />
                                                <span className="text-xs font-medium">Residents</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-white/10">
                                            <div className="flex items-center gap-2 px-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/20 p-0.5 flex items-center justify-center">
                                                    <span className="text-[10px] font-bold text-white">DK</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-medium text-gray-200">Dhinesh K.</span>
                                                    <span className="text-[9px] text-gray-500">Admin</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 p-6 flex flex-col gap-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-[#0B0F19]/0 to-[#0B0F19]/0">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold text-white tracking-wide">Overview</h3>
                                                <p className="text-xs text-gray-400">Welcome back, here's what's happening today.</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="h-8 px-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-gray-300">
                                                    <span>This Month</span>
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                                <div className="h-8 px-4 rounded-lg bg-primary-600 text-white flex items-center text-xs font-medium shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                                                    Generate Report
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="bg-[#131A2A]/80 backdrop-blur-md rounded-xl border border-white/5 p-4 flex flex-col gap-2 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500/10 blur-xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-medium text-gray-400">Total Revenue</span>
                                                    <div className="w-6 h-6 rounded-md bg-primary-500/20 text-primary-400 flex items-center justify-center border border-primary-500/20">
                                                        <IndianRupee className="w-3 h-3" />
                                                    </div>
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-2xl font-bold text-white">₹1.42M</span>
                                                    <span className="text-[10px] text-green-400 mb-1 flex items-center">+12.5%</span>
                                                </div>
                                            </div>

                                            <div className="bg-[#131A2A]/80 backdrop-blur-md rounded-xl border border-white/5 p-4 flex flex-col gap-2 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 blur-xl rounded-full translate-x-1/2 -translate-y-1/2" />
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-medium text-gray-400">Active Complaints</span>
                                                    <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                                                        <MessageSquare className="w-3 h-3" />
                                                    </div>
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-2xl font-bold text-white">24</span>
                                                    <span className="text-[10px] text-red-400 mb-1 flex items-center">+4 New</span>
                                                </div>
                                            </div>

                                            <div className="bg-[#131A2A]/80 backdrop-blur-md rounded-xl border border-white/5 p-4 flex flex-col gap-2 relative overflow-hidden">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-medium text-gray-400">Occupancy Rate</span>
                                                    <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/20">
                                                        <Building2 className="w-3 h-3" />
                                                    </div>
                                                </div>
                                                <div className="flex items-end gap-2">
                                                    <span className="text-2xl font-bold text-white">96%</span>
                                                    <span className="text-[10px] text-green-400 mb-1 flex items-center">+1.2%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chart & Activity Row */}
                                        <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
                                            {/* Fake Chart */}
                                            <div className="col-span-2 bg-[#131A2A]/80 backdrop-blur-md rounded-xl border border-white/5 p-4 flex flex-col relative overflow-hidden">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[11px] font-medium text-gray-300">Revenue Trend</span>
                                                    <span className="text-[10px] text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/20">Detailed View</span>
                                                </div>
                                                <div className="flex-1 relative flex items-end gap-2 pb-2">
                                                    {/* Fake bar chart columns */}
                                                    {[40, 65, 45, 80, 55, 90, 75, 100, 85].map((height, i) => (
                                                        <div key={i} className="flex-1 flex flex-col justify-end gap-2 group">
                                                            <div
                                                                className={`w-full rounded-sm transition-all duration-500 ${i === 7 ? 'bg-primary-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'bg-primary-500/20 group-hover:bg-primary-500/40 border border-primary-500/10'}`}
                                                                style={{ height: `${height}%` }}
                                                            />
                                                            <div className="text-[8px] text-gray-600 text-center uppercase">
                                                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'][i]}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Recent Activity */}
                                            <div className="col-span-1 bg-[#131A2A]/80 backdrop-blur-md rounded-xl border border-white/5 p-4 flex flex-col">
                                                <span className="text-[11px] font-medium text-gray-300 mb-4">Recent Activity</span>
                                                <div className="flex-1 space-y-3 overflow-hidden">
                                                    {[
                                                        { action: "Payment Received", sub: "Apt 4B - Maintenance", amt: "+₹4,500", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
                                                        { action: "Complaint Fixed", sub: "Lift 2 Malfunction", amt: "Resolved", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
                                                        { action: "Visitor Alert", sub: "Delivery for 7A", amt: "09:42 AM", color: "text-gray-400", bg: "bg-white/5 border-white/10" },
                                                        { action: "Payment Received", sub: "Apt 1C - Maintenance", amt: "+₹4,500", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center justify-between pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${item.bg}`}>
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[10px] text-gray-300">{item.action}</span>
                                                                    <span className="text-[9px] text-gray-500">{item.sub}</span>
                                                                </div>
                                                            </div>
                                                            <span className={`text-[10px] font-medium ${item.color}`}>{item.amt}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Segment */}
            <section id="features" className="py-32 relative z-10 border-t border-white/5 bg-[#0B0F19]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-fade-in opacity-0" style={{ animationDelay: '200ms' }}>
                        <h2 className="text-base text-primary-400 font-semibold tracking-wide uppercase mb-3">Rethink how you build</h2>
                        <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Everything. Fully Customizable.
                        </h3>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            A complete suite of tools designed to accelerate modern housing society management without sacrificing quality.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="group relative bg-[#131A2A] rounded-2xl border border-white/5 p-8 hover:border-primary-500/50 transition-all duration-500 animate-fade-in-up opacity-0 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.2)]"
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="h-14 w-14 bg-[#0B0F19] border border-white/10 rounded-xl flex items-center justify-center mb-6 text-primary-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 shadow-inner group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]group-hover:border-primary-500/30">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-3">
                                        {feature.title}
                                    </h4>
                                    <p className="text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats / Proof */}
            <section className="py-24 relative z-10 border-y border-white/5 bg-[#080B13] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Join over 500+ Housing Societies</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {[
                            { value: "500+", label: "Societies Active" },
                            { value: "50K+", label: "Residents App" },
                            { value: "2Cr+", label: "Payments Processed" },
                            { value: "99.9%", label: "Uptime SLA" },
                        ].map((stat, index) => (
                            <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in opacity-0" style={{ animationDelay: `${(index + 2) * 150}ms` }}>
                                <p className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 drop-shadow-lg">
                                    {stat.value}
                                </p>
                                <p className="text-sm sm:text-base font-medium text-primary-400 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-primary-900/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary-600/30 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-20 animate-fade-in-up opacity-0" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                        Ready to Build?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Own your code. Build once and deploy your custom management platform everywhere.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-[#0B0F19] bg-white hover:bg-gray-100 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:scale-105"
                    >
                        Get Started for Free
                        <ArrowRight className="h-6 w-6" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0B0F19] border-t border-white/10 pt-20 pb-10 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-cyan-500">
                                    <Building2 className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">FlatFlow</span>
                            </div>
                            <p className="text-base text-gray-400 leading-relaxed mb-8 max-w-sm">
                                Empowering communities with modern, intuitive, and highly customizable management solutions.
                            </p>
                            <div className="flex items-center gap-4">
                                <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"><span className="sr-only">Twitter</span><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></Link>
                                <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"><span className="sr-only">GitHub</span><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg></Link>
                                <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"><span className="sr-only">LinkedIn</span><svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Product</h3>
                            <ul className="space-y-4">
                                <li><Link href="#features" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Features</Link></li>
                                <li><Link href="#integrations" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Integrations</Link></li>
                                <li><Link href="#pricing" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Pricing</Link></li>
                                <li><Link href="#changelog" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Changelog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Resources</h3>
                            <ul className="space-y-4">
                                <li><Link href="#docs" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Documentation</Link></li>
                                <li><Link href="#blog" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Blog</Link></li>
                                <li><Link href="#community" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Community</Link></li>
                                <li><Link href="#contact" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Legal</h3>
                            <ul className="space-y-4">
                                <li><Link href="#privacy" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#terms" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</Link></li>
                                <li><Link href="#security" className="text-base text-gray-400 hover:text-primary-400 transition-colors">Security</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} FlatFlow Inc. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 mt-4 md:mt-0">
                            <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">Status</span>
                            <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">Cookies</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
