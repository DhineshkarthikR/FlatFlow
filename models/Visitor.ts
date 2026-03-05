import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVisitor extends Document {
    visitorName: string;
    flatNumber: string;
    entryTime: Date;
    exitTime?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const VisitorSchema = new Schema<IVisitor>(
    {
        visitorName: { type: String, required: true, trim: true },
        flatNumber: { type: String, required: true, trim: true },
        entryTime: { type: Date, default: Date.now },
        exitTime: { type: Date, default: null },
    },
    { timestamps: true }
);

const Visitor: Model<IVisitor> =
    mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
export default Visitor;
