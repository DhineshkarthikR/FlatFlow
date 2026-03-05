import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAuth, apiResponse } from "@/lib/auth";
import { getRazorpay } from "@/lib/razorpay";
import Payment from "@/models/Payment";

const MAINTENANCE_FEE = 5000; // Fixed maintenance fee in INR (paise)

export async function GET() {
    try {
        const user = await requireAuth();
        await connectDB();

        let payments;
        if (user.role === "admin") {
            payments = await Payment.find()
                .populate("residentId", "name email flatNumber")
                .sort({ createdAt: -1 });
        } else {
            payments = await Payment.find({ residentId: user.userId })
                .sort({ createdAt: -1 });
        }

        return apiResponse(true, "Payments retrieved", payments);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await requireAuth();
        await connectDB();

        // Server-side amount validation - do NOT trust frontend amount
        const amount = MAINTENANCE_FEE * 100; // Convert to paise

        const razorpay = getRazorpay();
        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        const payment = await Payment.create({
            residentId: user.userId,
            amount: MAINTENANCE_FEE,
            razorpayOrderId: order.id,
            status: "pending",
        });

        return apiResponse(true, "Order created", {
            orderId: order.id,
            amount: MAINTENANCE_FEE,
            currency: "INR",
            paymentId: payment._id,
        }, 201);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}
