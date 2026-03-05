import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface INotice extends Document {
    title: string;
    content: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true, trim: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Notice: Model<INotice> =
    mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);
export default Notice;
