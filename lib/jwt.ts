import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export interface JwtPayload {
    userId: string;
    email: string;
    role: "admin" | "resident";
    name: string;
}

export function signToken(payload: JwtPayload): string {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): JwtPayload {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
