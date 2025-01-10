/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",    // Azul principal
        secondary: "#1E40AF",  // Azul secundario
        accent: "#EAB308",     // Amarillo accent
        background: "#F8FAFC", // Fondo claro
        text: "#1F2937",       // Color texto principal
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0,0,0,0.05)',
        'hover': '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
