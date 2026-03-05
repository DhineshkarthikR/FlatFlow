import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth, apiResponse } from "@/lib/auth";
import Visitor from "@/models/Visitor";

export async function GET() {
    try {
        await requireAuth();
        await connectDB();

        const visitors = await Visitor.find().sort({ entryTime: -1 });
        return apiResponse(true, "Visitors retrieved", visitors);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        await requireAuth();
        const { visitorName, flatNumber } = await request.json();

        if (!visitorName || !flatNumber) {
            return apiResponse(false, "Visitor name and flat number are required", null, 400);
        }

        await connectDB();

        const visitor = await Visitor.create({
            visitorName: visitorName.trim(),
            flatNumber: flatNumber.trim(),
            entryTime: new Date(),
        });

        return apiResponse(true, "Visitor entry recorded", visitor, 201);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}
