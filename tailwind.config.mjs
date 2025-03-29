/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "base-content": "#171717",
          "primary-content": "#ffffff",
          "secondary-content": "#ffffff",
          "accent-content": "#ffffff",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "base-content": "#e0e0e0",
          "primary-content": "#ffffff",
          "secondary-content": "#ffffff", 
          "accent-content": "#ffffff",
        },
      },
      "cupcake"
    ],
  },
};
