import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin, apiResponse } from "@/lib/auth";
import Expense from "@/models/Expense";

export async function GET() {
    try {
        await requireAdmin();
        await connectDB();

        const expenses = await Expense.find()
            .populate("createdBy", "name")
            .sort({ createdAt: -1 });

        return apiResponse(true, "Expenses retrieved", expenses);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await requireAdmin();
        const { title, amount, category, description } = await request.json();

        if (!title || !amount || !category) {
            return apiResponse(false, "Title, amount, and category are required", null, 400);
        }

        if (typeof amount !== "number" || amount <= 0) {
            return apiResponse(false, "Amount must be a positive number", null, 400);
        }

        await connectDB();

        const expense = await Expense.create({
            title: title.trim(),
            amount,
            category: category.trim(),
            description: description?.trim() || "",
            createdBy: user.userId,
        });

        return apiResponse(true, "Expense created", expense, 201);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return apiResponse(false, message, null, 500);
    }
}
