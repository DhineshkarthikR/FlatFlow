import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth, requireAdmin, apiResponse } from "@/lib/auth";
import Complaint from "@/models/Complaint";

export async function GET() {
    try {
        const user = await requireAuth();
        await connectDB();

        let complaints;
        if (user.role === "admin") {
            complaints = await Complaint.find()
                .populate("residentId", "name email flatNumber")
                .sort({ createdAt: -1 });
        } else {
            complaints = await Complaint.find({ residentId: user.userId })
                .sort({ createdAt: -1 });
        }

        return apiResponse(true, "Complaints retrieved", complaints);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, message.includes("Authentication") ? 401 : 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await requireAuth();
        const { title, description, imageUrl } = await request.json();

        if (!title || !description) {
            return apiResponse(false, "Title and description are required", null, 400);
        }

        await connectDB();

        const complaint = await Complaint.create({
            title: title.trim(),
            description: description.trim(),
            residentId: user.userId,
            imageUrl: imageUrl || "",
            status: "pending",
        });

        return apiResponse(true, "Complaint created", complaint, 201);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, message.includes("Authentication") ? 401 : 500);
    }
}
