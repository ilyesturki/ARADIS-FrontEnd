import type { Config } from "tailwindcss";

// #2AC68F
//
// #ECFBF6

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-opacity-10",
    "!bg-opacity-10",
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
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        grayscale: {
          "100": "#FFFFFF",
          "200": "#F2F4F8",
          "300": "#F2F5F9",
          "400": "#A3B2C7",
          "500": "#333F4E",
          "600": "#04050C",
          "700": "#131524",
        },
        pinkAccent: "#FF7474",
        greenAccent: {
          "500": "#3DD9B3",
          "600": "#2FCC40",
          "700": "#2AC790",
          "800": "#2EB88A",
          "900": "#0F626B",
        },
        redAccent: {
          "700": "#FF7474",
          "800": "#FA7275",
          "900": "#EA6365",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        gradient: "gradient-shift 3s infinite ease-in-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;
