import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { apiResponse } from "@/lib/auth";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password, flatNumber } = await request.json();

        if (!name || !email || !password || !flatNumber) {
            return apiResponse(false, "All fields are required", null, 400);
        }

        if (password.length < 6) {
            return apiResponse(false, "Password must be at least 6 characters", null, 400);
        }

        await connectDB();

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return apiResponse(false, "Email already registered", null, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: "resident", // Always resident on registration
            flatNumber: flatNumber.trim(),
        });

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        });

        const response = apiResponse(true, "Registration successful", {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                flatNumber: user.flatNumber,
            },
        }, 201);

        // Set HTTP-only cookie
        const res = new Response(response.body, response);
        res.headers.append(
            "Set-Cookie",
            `flatflow_token=${token}; HttpOnly; Secure; Path=/; Max-Age=86400; SameSite=Lax`
        );
        return res;
    } catch (error: any) {
        console.error("Registration error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });
        return apiResponse(false, error.message || "Internal server error", null, 500);
    }
}
