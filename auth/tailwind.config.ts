import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-open-sans)", "sans-serif"],
    },
    extend: {
      fontFamily: {
        display: [
          "var(--font-museo-moderno)",
          "var(--font-open-sans)",
          "sans-serif",
        ],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mw_auth: {
          primary: "#495e35",
          "primary-content": "#d8ddd4",
          secondary: "#b7bfb1",
          "secondary-content": "#0c0d0c",
          accent: "#5e526e",
          "accent-content": "#dddae1",
          neutral: "#26391d",
          "neutral-content": "#cfd4cd",
          "base-100": "#ffffff",
          "base-200": "#dedede",
          "base-300": "#bebebe",
          "base-content": "#161616",
          info: "b7bfb1",
          "info-content": "#0c0d0c",
          success: "#006631",
          "success-content": "#d0dfd3",
          warning: "#854900",
          "warning-content": "#e7d9ce",
          error: "#b50000",
          "error-content": "#f7d4ce",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
