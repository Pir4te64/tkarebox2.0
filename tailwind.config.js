// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul': '#0066cc', // Aquí añades el color personalizado
      },
    },
  },
  plugins: [],
};
