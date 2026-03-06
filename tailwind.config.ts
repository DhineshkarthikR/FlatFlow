import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#eef2ff",
                    100: "#e0e7ff",
                    200: "#c7d2fe",
                    300: "#a5b4fc",
                    400: "#818cf8",
                    500: "#6366f1",
                    600: "#4f46e5",
                    700: "#4338ca",
                    800: "#3730a3",
                    900: "#312e81",
                },
                accent: {
                    500: "#06b6d4",
                    600: "#0891b2",
                },
                background: "#0B0F19",
                surface: "#131A2A",
                surfaceHover: "#1E293B",
                heading: "#FFFFFF",
                body: "#94A3B8",
                muted: "#64748B",
                border: "#1E293B",
            },
            fontFamily: {
                sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
                heading: ["Outfit", "Inter", "system-ui", "sans-serif"],
                body: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(79, 70, 229, 0.15) 0%, transparent 60%)',
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-right": {
                    "0%": { opacity: "0", transform: "translateX(-20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                },
                "icon-bounce": {
                    "0%, 100%": { transform: "translateY(0) scale(1)" },
                    "50%": { transform: "translateY(-8px) scale(1.1)" },
                },
                "gradient": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "200% 50%" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.5s ease-out forwards",
                "fade-in-right": "fade-in-right 0.5s ease-out forwards",
                "fade-in": "fade-in 0.5s ease-out forwards",
                "float": "float 3s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "icon-bounce": "icon-bounce 2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;

