import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

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
        <html lang="en" className="theme-dark" suppressHydrationWarning>
            <body className="min-h-screen bg-background antialiased">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
