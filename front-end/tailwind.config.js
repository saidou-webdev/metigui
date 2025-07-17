/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A6CE39',        // boutons principaux, CTA
        secondary: '#44C553',      // succès, badges
        accentblue: '#2271B1',     // boutons alternatifs, liens info
        orange: '#F28C28',         // accent chaud, boutons spéciaux
        orangedark: '#E85D04',     // hover, warning, badge important
        dark: '#1E1B23',           // header, footer, sidebar
        light: '#FFFFFF',          // texte clair, fond clair composants
        graylight: '#F0F0F1',      // fond global, zone grise neutre
        textdark: '#202124',       // texte par défaut
        textsecondary: '#5F6368',  // texte léger, sous-titre
        warning: '#F7E288',        // alertes douces
      },
    },
  },
  plugins: [],
}
