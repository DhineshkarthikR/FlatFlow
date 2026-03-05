import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth, apiResponse } from "@/lib/auth";
import Event from "@/models/Event";

export async function GET() {
    try {
        await requireAuth();
        await connectDB();

        const events = await Event.find()
            .populate("bookedBy", "name flatNumber")
            .sort({ date: -1 });

        return apiResponse(true, "Events retrieved", events);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await requireAuth();
        const { title, description, date, facility } = await request.json();

        if (!title || !description || !date || !facility) {
            return apiResponse(false, "All fields are required", null, 400);
        }

        await connectDB();

        // Check for time conflict on the same facility
        const eventDate = new Date(date);
        const conflictingEvent = await Event.findOne({
            facility: facility.trim(),
            date: {
                $gte: new Date(eventDate.getTime() - 2 * 60 * 60 * 1000), // 2h before
                $lte: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000), // 2h after
            },
            status: { $ne: "cancelled" },
        });

        if (conflictingEvent) {
            return apiResponse(false, "Time slot conflict with existing booking", null, 409);
        }

        const event = await Event.create({
            title: title.trim(),
            description: description.trim(),
            date: eventDate,
            bookedBy: user.userId,
            facility: facility.trim(),
            status: "pending",
        });

        return apiResponse(true, "Booking created", event, 201);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}
