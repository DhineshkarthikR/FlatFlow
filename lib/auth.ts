import { cookies } from "next/headers";
import { verifyToken, type JwtPayload } from "./jwt";

export async function getUser(): Promise<JwtPayload | null> {
    const cookieStore = cookies();
    const token = cookieStore.get("flatflow_token")?.value;

    if (!token) return null;

    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}

export async function requireAuth(): Promise<JwtPayload> {
    const user = await getUser();
    if (!user) {
        throw new Error("Authentication required");
    }
    return user;
}

export async function requireAdmin(): Promise<JwtPayload> {
    const user = await requireAuth();
    if (user.role !== "admin") {
        throw new Error("Admin access required");
    }
    return user;
}

export function apiResponse(
    success: boolean,
    message: string,
    data?: unknown,
    status: number = 200
) {
    return Response.json({ success, message, data }, { status });
}
