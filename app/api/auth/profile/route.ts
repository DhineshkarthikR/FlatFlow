import { NextRequest, NextResponse } from "next/server";
import { getUser, apiResponse } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function DELETE(request: NextRequest) {
    try {
        const payload = await getUser();
        if (!payload) {
            return apiResponse(false, "Not authenticated", null, 401);
        }

        await connectDB();

        const user = await User.findByIdAndDelete(payload.userId);
        if (!user) {
            return apiResponse(false, "User not found", null, 404);
        }

        const response = apiResponse(true, "Account deleted successfully");
        const res = new NextResponse(response.body, response);
        res.headers.set(
            "Set-Cookie",
            "flatflow_token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"
        );
        return res;
    } catch (error) {
        console.error("Delete account error:", error);
        return apiResponse(false, "Internal server error", null, 500);
    }
}
