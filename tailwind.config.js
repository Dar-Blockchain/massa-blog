/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVar}))`;
  };
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@massalabs/react-ui-kit/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("./src/themes/preset.js")],
  darkMode: "class", // or 'media' or 'class',

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        "2xl": "128px",
      },
    },

    extend: {
      colors: {
        "primary-50": customColors("--c-primary-50"),
        "primary-100": customColors("--c-primary-100"),
        "primary-200": customColors("--c-primary-200"),
        "primary-300": customColors("--c-primary-300"),
        "primary-400": customColors("--c-primary-400"),
        "primary-500": customColors("--c-primary-500"),
        "primary-6000": customColors("--c-primary-600"),
        "primary-700": customColors("--c-primary-700"),
        "primary-800": customColors("--c-primary-800"),
        "primary-900": customColors("--c-primary-900"),

        "secondary-50": customColors("--c-secondary-50"),
        "secondary-100": customColors("--c-secondary-100"),
        "secondary-200": customColors("--c-secondary-200"),
        "secondary-300": customColors("--c-secondary-300"),
        "secondary-400": customColors("--c-secondary-400"),
        "secondary-500": customColors("--c-secondary-500"),
        "secondary-6000": customColors("--c-secondary-600"),
        "secondary-700": customColors("--c-secondary-700"),
        "secondary-800": customColors("--c-secondary-800"),
        "secondary-900": customColors("--c-secondary-900"),

        "neutral-50": customColors("--c-neutral-50"),
        "neutral-100": customColors("--c-neutral-100"),
        "neutral-200": customColors("--c-neutral-200"),
        "neutral-300": customColors("--c-neutral-300"),
        "neutral-400": customColors("--c-neutral-400"),
        "neutral-500": customColors("--c-neutral-500"),
        "neutral-6000": customColors("--c-neutral-600"),
        "neutral-700": customColors("--c-neutral-700"),
        "neutral-800": customColors("--c-neutral-800"),
        "neutral-900": customColors("--c-neutral-900"),

        "primary-blue": "rgb(146, 179, 202)",
        "primary-orange": "rgb(243, 195, 177)",
        "main-text": "rgb(0, 43, 49)",
        "error-red": "rgb(208, 69, 82)",
      },
      borderColor: ({ theme }) => ({
        secondary: theme("colors.gray.600"),
        tertiary: theme("colors.gray.400"),
        brand: theme("colors.blue.500"),
      }),
      textColor: {
        neutral: "#1a202c",
      },
      animation: {
        spinner: "spinner 1.5s linear infinite",
        "spinner-delayed": "spinner 1.5s linear infinite 0.75s",
      },
      keyframes: {
        spinner: {
          "0%": { transform: "scale(0)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 0 },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
