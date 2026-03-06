import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import { apiResponse } from "@/lib/auth";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return apiResponse(false, "Email and password are required", null, 400);
        }

        await connectDB();

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return apiResponse(false, "Invalid email or password", null, 401);
        }

        if (!user.password) {
            return apiResponse(false, "This account uses Google Sign-In. Please sign in with Google.", null, 401);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return apiResponse(false, "Invalid email or password", null, 401);
        }

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        });

        const response = apiResponse(true, "Login successful", {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                flatNumber: user.flatNumber,
            },
        });

        const res = new Response(response.body, response);
        res.headers.append(
            "Set-Cookie",
            `flatflow_token=${token}; HttpOnly; Secure; Path=/; Max-Age=86400; SameSite=Lax`
        );
        return res;
    } catch (error: any) {
        console.error("Login error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        });
        return apiResponse(false, error.message || "Internal server error", null, 500);
    }
}
