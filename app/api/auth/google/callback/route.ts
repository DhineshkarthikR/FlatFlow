import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import User from "@/models/User";
import { getBaseUrl } from "@/lib/url";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    const baseUrl = getBaseUrl(request);
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    if (!code) {
        return NextResponse.redirect(new URL("/login?error=no_code", baseUrl));
    }

    try {
        // 1. Exchange auth code for tokens
        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        const tokenData = await tokenRes.json();

        if (!tokenData.access_token) {
            console.error("Google token exchange failed:", tokenData);
            return NextResponse.redirect(new URL("/login?error=token_failed", baseUrl));
        }

        // 2. Get user info from Google
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const googleUser = await userInfoRes.json();

        if (!googleUser.email) {
            return NextResponse.redirect(new URL("/login?error=no_email", baseUrl));
        }

        // 3. Find or create user in DB
        await connectDB();

        let user = await User.findOne({
            $or: [
                { googleId: googleUser.id },
                { email: googleUser.email.toLowerCase() },
            ],
        });

        if (user) {
            // Update Google ID and avatar if not set
            if (!user.googleId) {
                user.googleId = googleUser.id;
            }
            if (googleUser.picture) {
                user.avatar = googleUser.picture;
            }
            await user.save();
        } else {
            // Create new user
            user = await User.create({
                name: googleUser.name || googleUser.email.split("@")[0],
                email: googleUser.email.toLowerCase(),
                googleId: googleUser.id,
                avatar: googleUser.picture || "",
                role: "resident",
                flatNumber: "",
            });
        }

        // 4. Sign JWT token (same as existing auth system)
        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        });

        // 5. Set cookie and redirect to dashboard
        const response = NextResponse.redirect(new URL("/dashboard", baseUrl));
        response.cookies.set("flatflow_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 86400,
            sameSite: "lax",
        });

        return response;
    } catch (error: any) {
        console.error("Google OAuth error:", error);
        return NextResponse.redirect(new URL("/login?error=auth_failed", baseUrl));
    }
}
