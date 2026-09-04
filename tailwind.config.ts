/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          green: "#277C78",
          purple: "#626070",
          teal: "#82C9D7",
          orange: "#F2CDAC",
          blue: "#826CB0",
        },
        // Neutral palette
        neutral: {
          900: "#201F24",
          700: "#696868",
          500: "#B3B3B3",
          300: "#D6D6D6",
          100: "#F2F2F2",
          0: "#FFFFFF",
        },
        // Beige palette
        beige: {
          500: "#98908B",
          100: "#F8F4F0",
        },
        // Semantic colors
        positive: "#277C78",
        negative: "#C94736",
      },
      fontFamily: {
        sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
        persian: ["var(--font-vazirmatn)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
