import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Complaint from "../models/Complaint";
import Payment from "../models/Payment";
import Notice from "../models/Notice";
import Expense from "../models/Expense";
import Visitor from "../models/Visitor";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is required in .env");
    process.exit(1);
}

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Complaint.deleteMany({}),
            Payment.deleteMany({}),
            Notice.deleteMany({}),
            Expense.deleteMany({}),
            Visitor.deleteMany({}),
        ]);

        console.log("Cleared existing data...");

        const hashedPassword = await bcrypt.hash("password123", 12);

        // Create Admin
        const admin = await User.create({
            name: "Admin User",
            email: "admin@flatflow.com",
            password: hashedPassword,
            role: "admin",
            flatNumber: "Admin-HQ",
        });

        // Create Residents
        const resident1 = await User.create({
            name: "John Doe",
            email: "john@example.com",
            password: hashedPassword,
            role: "resident",
            flatNumber: "A-101",
        });

        const resident2 = await User.create({
            name: "Jane Smith",
            email: "jane@example.com",
            password: hashedPassword,
            role: "resident",
            flatNumber: "B-202",
        });

        console.log("Created users...");

        // Create Complaints
        await Complaint.create([
            {
                title: "Leaking Pipe",
                description: "Water leaking from kitchen sink pipe since morning.",
                status: "pending",
                residentId: resident1._id,
            },
            {
                title: "Broken Lift",
                description: "Lift in block B is not working.",
                status: "approved",
                residentId: resident2._id,
            },
            {
                title: "Streetlight Out",
                description: "Streetlight near gate 2 is not working.",
                status: "resolved",
                residentId: resident1._id,
            },
        ]);

        // Create Payments
        await Payment.create([
            {
                residentId: resident1._id,
                amount: 5000,
                razorpayOrderId: "order_mock1",
                razorpayPaymentId: "pay_mock1",
                status: "completed",
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            },
            {
                residentId: resident2._id,
                amount: 5000,
                razorpayOrderId: "order_mock2",
                razorpayPaymentId: "pay_mock2",
                status: "completed",
                createdAt: new Date(),
            },
        ]);

        // Create Expenses (last 6 months)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        for (let i = 0; i < months.length; i++) {
            await Expense.create({
                title: `${months[i]} Security Salary`,
                amount: 15000 + Math.random() * 5000,
                category: "Security",
                createdBy: admin._id,
                createdAt: new Date(2024, i, 1)
            });
            await Expense.create({
                title: `${months[i]} Electricity Bill`,
                amount: 8000 + Math.random() * 3000,
                category: "Utilities",
                createdBy: admin._id,
                createdAt: new Date(2024, i, 1)
            });
        }

        // Create Notices
        await Notice.create([
            {
                title: "Annual General Meeting",
                content: "AGM scheduled for Sunday at 10 AM in the clubhouse.",
                createdBy: admin._id,
            },
            {
                title: "Pest Control",
                content: "Common areas will be sprayed for pests on Friday.",
                createdBy: admin._id,
            },
        ]);

        // Create Visitors
        await Visitor.create([
            {
                visitorName: "Mark delivery",
                flatNumber: "A-101",
                entryTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
            },
            {
                visitorName: "Sarah guest",
                flatNumber: "B-202",
                entryTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5h ago
                exitTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1h ago
            },
        ]);

        console.log("Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
