import { getUser, apiResponse } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    try {
        const payload = await getUser();
        if (!payload) {
            return apiResponse(false, "Not authenticated", null, 401);
        }

        await connectDB();
        const user = await User.findById(payload.userId).select("-password");
        if (!user) {
            return apiResponse(false, "User not found", null, 404);
        }

        return apiResponse(true, "User retrieved", {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            flatNumber: user.flatNumber,
        });
    } catch {
        return apiResponse(false, "Internal server error", null, 500);
    }
}
