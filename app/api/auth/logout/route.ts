import { apiResponse } from "@/lib/auth";

export async function POST() {
    const response = apiResponse(true, "Logged out successfully");
    const res = new Response(response.body, response);
    res.headers.append(
        "Set-Cookie",
        `flatflow_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
    );
    return res;
}
