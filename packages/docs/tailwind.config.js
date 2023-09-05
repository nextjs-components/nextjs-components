/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".dark-theme"],
  content: [
    "./(app|components)/**/*.{js,ts,jsx,tsx,mdx}",
    "mdx-components.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(ellipse at 10% 90%,#f5a62333,#7b26c940,transparent),linear-gradient(to bottom right, #ee989020, #ff008030, #7d28cc40, #6b66ff10)",
        example:
          "linear-gradient(330deg, var(--accents-2) 0, var(--accents-1) 100%)",
        "example-dark": "linear-gradient(0deg, #1c1c1c 0, #282828)",
      },
      boxShadow: {
        "theme-switcher-label":
          "0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
