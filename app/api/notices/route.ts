import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth, requireAdmin, apiResponse } from "@/lib/auth";
import Notice from "@/models/Notice";

export async function GET() {
    try {
        await requireAuth();
        await connectDB();

        const notices = await Notice.find()
            .populate("createdBy", "name")
            .sort({ createdAt: -1 });

        return apiResponse(true, "Notices retrieved", notices);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await requireAdmin();
        const { title, content } = await request.json();

        if (!title || !content) {
            return apiResponse(false, "Title and content are required", null, 400);
        }

        await connectDB();

        const notice = await Notice.create({
            title: title.trim(),
            content: content.trim(),
            createdBy: user.userId,
        });

        return apiResponse(true, "Notice created", notice, 201);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, message.includes("Admin") ? 403 : 500);
    }
}
