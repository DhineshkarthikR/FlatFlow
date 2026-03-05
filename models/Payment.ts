import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPayment extends Document {
    residentId: Types.ObjectId;
    amount: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    status: "pending" | "completed" | "failed";
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
    {
        residentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        amount: { type: Number, required: true, min: 0 },
        razorpayOrderId: { type: String, required: true },
        razorpayPaymentId: { type: String, default: "" },
        status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    },
    { timestamps: true }
);

const Payment: Model<IPayment> =
    mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
