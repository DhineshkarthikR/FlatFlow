import { NextRequest } from "next/server";

export function getBaseUrl(request: NextRequest): string {
    // 1. Explicitly set production/development URL
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL;
    }

    // 2. Vercel automatically sets this for the production deployment
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    // 3. Fallback to the requested URL origin (works well for localhost)
    // In Vercel, this might be a deployment-specific URL (e.g., project-xxx.vercel.app)
    // Ensure it uses https in production
    let origin = request.nextUrl.origin;
    if (process.env.NODE_ENV === "production" && origin.startsWith("http://")) {
        origin = origin.replace("http://", "https://");
    }

    return origin;
}
