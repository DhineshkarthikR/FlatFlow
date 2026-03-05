import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("flatflow_token")?.value;
    const { pathname } = request.nextUrl;

    // Public paths
    if (
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/register" ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/api/uploadthing") ||
        pathname.startsWith("/_next") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        // Admin route protection
        if (pathname.startsWith("/admin") && payload.role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // Add user info to headers for API routes
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", payload.userId as string);
        requestHeaders.set("x-user-role", payload.role as string);
        requestHeaders.set("x-user-email", payload.email as string);

        return NextResponse.next({
            request: { headers: requestHeaders },
        });
    } catch {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("flatflow_token");
        return response;
    }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
