import { NextRequest } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { requireAuth, apiResponse } from "@/lib/auth";
import Payment from "@/models/Payment";

export async function POST(request: NextRequest) {
    try {
        await requireAuth();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return apiResponse(false, "Missing payment verification fields", null, 400);
        }

        // HMAC-SHA256 signature verification
        const key_secret = process.env.RAZORPAY_KEY_SECRET;
        if (!key_secret) {
            return apiResponse(false, "Payment configuration error", null, 500);
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", key_secret)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            // Mark payment as failed
            await connectDB();
            await Payment.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "failed" }
            );
            return apiResponse(false, "Payment verification failed", null, 400);
        }

        // Signature verified - update payment record
        await connectDB();
        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                razorpayPaymentId: razorpay_payment_id,
                status: "completed",
            },
            { new: true }
        );

        if (!payment) {
            return apiResponse(false, "Payment record not found", null, 404);
        }

        return apiResponse(true, "Payment verified successfully", payment);
    } catch (error) {
        console.error("Payment verification error:", error);
        return apiResponse(false, "Internal server error", null, 500);
    }
}
