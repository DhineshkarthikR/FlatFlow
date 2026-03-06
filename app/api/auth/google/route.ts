import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { getBaseUrl } from "@/lib/url";

export async function GET(request: NextRequest) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const baseUrl = getBaseUrl(request);
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    const params = new URLSearchParams({
        client_id: clientId!,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
    });

    redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
