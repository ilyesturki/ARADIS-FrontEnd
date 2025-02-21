import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-opacity-10",
    
    "text-red-500",
    "text-greenAccent-800",
    "text-pinkAccent",
    "text-greenAccent-700",
    "bg-red-500",
    "bg-greenAccent-800",
    "bg-pinkAccent",
    "bg-greenAccent-700",
    "shadow-red-500",
    "shadow-greenAccent-800",
    "shadow-pinkAccent",
    "shadow-greenAccent-700",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "576px", // Bootstrap's small breakpoint
        md: "768px", // Bootstrap's medium breakpoint
        lg: "992px", // Bootstrap's large breakpoint
        xl: "1200px", // Bootstrap's extra-large breakpoint
        "2xl": "1400px", // Bootstrap's extra-extra-large breakpoint
      },
    },
    screens: {
      sm: "576px", // Bootstrap's small breakpoint
      md: "768px", // Bootstrap's medium breakpoint
      lg: "992px", // Bootstrap's large breakpoint
      xl: "1200px", // Bootstrap's extra-large breakpoint
      "2xl": "1400px", // Bootstrap's extra-extra-large breakpoint
    },
    extend: {
      colors: {
        grayscale: {
          700: "#131524",
          600: "#04050C",
          500: "#333F4E",
          400: "#A3B2C7",
          300: "#F2F5F9",
          200: "#F2F4F8",
          100: "#FFFFFF",
        },
        pinkAccent: "#FF7474",
        greenAccent: {
          900: "#0F626B",
          800: "#2FCC40",
          700: "#3DD9B3",
        },
        redAccent: {
          900: "#EA6365",
          800: "#FA7275",
          700: "#FF7474",
        },
        error: "#B80000",
        text: {
          primary: "#0F626B",
          secondary: "#61767F",
          disabled: "#",
        },
        orangeAccent: "#F9AB72",
        purpleAccent: "#EEA8FD",
        blueAccent: "#56B8FF",

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;
