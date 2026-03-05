import { connectDB } from "@/lib/db";
import { requireAdmin, apiResponse } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
    try {
        await requireAdmin();
        await connectDB();

        const residents = await User.find({ role: "resident" })
            .select("-password")
            .sort({ createdAt: -1 });

        return apiResponse(true, "Residents retrieved", residents);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, message.includes("Admin") ? 403 : 500);
    }
}
