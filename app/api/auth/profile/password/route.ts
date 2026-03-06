import { NextRequest, NextResponse } from "next/server";
import { getUser, apiResponse } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
    try {
        const payload = await getUser();
        if (!payload) {
            return apiResponse(false, "Not authenticated", null, 401);
        }

        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return apiResponse(false, "Current and new passwords are required", null, 400);
        }

        if (newPassword.length < 6) {
            return apiResponse(false, "New password must be at least 6 characters", null, 400);
        }

        await connectDB();

        const user = await User.findById(payload.userId);
        if (!user) {
            return apiResponse(false, "User not found", null, 404);
        }

        if (!user.password) {
            return apiResponse(false, "This account uses Google Sign-In and has no password set", null, 400);
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return apiResponse(false, "Incorrect current password", null, 400);
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedNewPassword;
        await user.save();

        return apiResponse(true, "Password updated successfully");
    } catch (error) {
        console.error("Change password error:", error);
        return apiResponse(false, "Internal server error", null, 500);
    }
}
