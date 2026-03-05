import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IComplaint extends Document {
    title: string;
    description: string;
    status: "pending" | "approved" | "resolved";
    residentId: Types.ObjectId;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        status: { type: String, enum: ["pending", "approved", "resolved"], default: "pending" },
        residentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        imageUrl: { type: String, default: "" },
    },
    { timestamps: true }
);

const Complaint: Model<IComplaint> =
    mongoose.models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);
export default Complaint;
