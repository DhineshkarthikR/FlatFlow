import Razorpay from "razorpay";

let razorpayInstance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
    if (!razorpayInstance) {
        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            throw new Error("Razorpay credentials not configured");
        }

        razorpayInstance = new Razorpay({ key_id, key_secret });
    }
    return razorpayInstance;
}
