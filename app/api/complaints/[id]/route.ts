import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth, apiResponse } from "@/lib/auth";
import Complaint from "@/models/Complaint";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAuth();
        await connectDB();

        const complaint = await Complaint.findById(params.id)
            .populate("residentId", "name email flatNumber");

        if (!complaint) {
            return apiResponse(false, "Complaint not found", null, 404);
        }

        return apiResponse(true, "Complaint retrieved", complaint);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const user = await requireAuth();
        if (user.role !== "admin") {
            return apiResponse(false, "Admin access required", null, 403);
        }

        const { status } = await request.json();
        if (!status || !["pending", "approved", "resolved"].includes(status)) {
            return apiResponse(false, "Valid status is required", null, 400);
        }

        await connectDB();

        const complaint = await Complaint.findByIdAndUpdate(
            params.id,
            { status },
            { new: true }
        ).populate("residentId", "name email flatNumber");

        if (!complaint) {
            return apiResponse(false, "Complaint not found", null, 404);
        }

        return apiResponse(true, "Complaint updated", complaint);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}
