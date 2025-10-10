/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                foreground: "var(--color-foreground)",
                background: "var(--color-background)",
                primary: "var(--color-primary)",
                "primary-light": "var(--color-primary-light)",
                accent: "var(--color-accent)",
                muted: "var(--color-muted)",
                "light-bg": "var(--color-light-bg)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "system-ui", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            fontSize: {
                h1: "var(--font-size-h1)",
                h2: "var(--font-size-h2)",
                h3: "var(--font-size-h3)",
                body: "var(--font-size-body)",
                caption: "var(--font-size-caption)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
            },
            boxShadow: {
                card: "var(--shadow-card)",
            },
            maxWidth: {
                container: "1200px",
            },
        },
    },
    darkMode: "media",
    plugins: [],
};
