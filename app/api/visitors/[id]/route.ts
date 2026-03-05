import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth, apiResponse } from "@/lib/auth";
import Visitor from "@/models/Visitor";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await requireAuth();
        await connectDB();

        const visitor = await Visitor.findByIdAndUpdate(
            params.id,
            { exitTime: new Date() },
            { new: true }
        );

        if (!visitor) {
            return apiResponse(false, "Visitor not found", null, 404);
        }

        return apiResponse(true, "Visitor exit recorded", visitor);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}
