import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "FlatFlow – Apartment Society Management",
    description:
        "Professional property management software for housing societies. Manage complaints, payments, visitors, and more.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-white antialiased">{children}</body>
        </html>
    );
}
