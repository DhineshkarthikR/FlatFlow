import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IExpense extends Document {
    title: string;
    amount: number;
    category: string;
    description: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>(
    {
        title: { type: String, required: true, trim: true },
        amount: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Expense: Model<IExpense> =
    mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
export default Expense;
