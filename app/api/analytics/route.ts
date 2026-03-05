import { connectDB } from "@/lib/db";
import { requireAdmin, apiResponse } from "@/lib/auth";
import Complaint from "@/models/Complaint";
import Payment from "@/models/Payment";
import User from "@/models/User";
import Visitor from "@/models/Visitor";

export async function GET() {
    try {
        await requireAdmin();
        await connectDB();

        // Total residents
        const totalResidents = await User.countDocuments({ role: "resident" });

        // Complaint stats
        const totalComplaints = await Complaint.countDocuments();
        const pendingComplaints = await Complaint.countDocuments({ status: "pending" });
        const resolvedComplaints = await Complaint.countDocuments({ status: "resolved" });

        // Revenue (sum of completed payments)
        const revenueResult = await Payment.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        // Monthly revenue
        const monthlyRevenue = await Payment.aggregate([
            { $match: { status: "completed" } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    total: { $sum: "$amount" },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            { $limit: 12 },
        ]);

        // Visitor stats
        const totalVisitors = await Visitor.countDocuments();

        // Recent complaints
        const recentComplaints = await Complaint.find()
            .populate("residentId", "name flatNumber")
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent payments
        const recentPayments = await Payment.find({ status: "completed" })
            .populate("residentId", "name flatNumber")
            .sort({ createdAt: -1 })
            .limit(5);

        return apiResponse(true, "Analytics retrieved", {
            totalResidents,
            totalComplaints,
            pendingComplaints,
            resolvedComplaints,
            totalRevenue,
            monthlyRevenue: monthlyRevenue.map((m) => ({
                month: `${m._id.year}-${String(m._id.month).padStart(2, "0")}`,
                revenue: m.total,
            })),
            totalVisitors,
            recentComplaints,
            recentPayments,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}
