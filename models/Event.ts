import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    bookedBy: Types.ObjectId;
    facility: string;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        date: { type: Date, required: true },
        bookedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        facility: { type: String, required: true, trim: true },
        status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    },
    { timestamps: true }
);

const Event: Model<IEvent> =
    mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
export default Event;
