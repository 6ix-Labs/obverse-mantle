// ***** NB: Tailwind Config for Main *****

import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class", 

  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["38px", "50px"],
      "3_5xl": ["45px", "55px"],
      "4xl": ["48px", "58px"],
      "5xl": ["65px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        calsans: ["Cal Sans", "sans-serif"],
        figtree: ["Figtree", "sans-serif"],
      },
      colors: {
        secondary: {
          DEFAULT: colors.neutral[200],
          hover: colors.neutral[300],
          border: colors.neutral[400],
          text: colors.neutral[500],
          dark: colors.neutral[800],
          darkHover: colors.neutral[900],
        },
        background: {
          main: "#FFEDE8",
          sub: "#E7562E",
          card: "#FADDD5",
          payment: "#E25E00",
          paymentDark: "#140800",
        },
        primary: "#ECEEFF",
        "coral-red": "#FFa28a",
        "slate-gray": "#525866",
        "pale-brown": "#2E1109",
        "brown": "#9A391f",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        pro: "391px",
        1024: "1024px",
        640: "640px",
        se: "376px",
        iPadAir: "821px",
        s8: "362px",
        s20: "420px",
        430: "430px",
        414: "415px",
        412: "412px",
        980: "978px",
      },
        letterSpacing: {
        text: '-0.04em',
      },
      lineHeight: {
        text: '1',       
        'text-sm': '0.9' 
      },
    },
  },
  plugins: [],
};

// ***** NB: Tailwind Config for V2 Dark *****

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

//   darkMode: ["class", "class"],

//   theme: {
//     fontSize: {
//       xs: ["12px", "16px"],
//       sm: ["14px", "20px"],
//       base: ["16px", "19.5px"],
//       lg: ["18px", "21.94px"],
//       xl: ["20px", "24.38px"],
//       "2xl": ["24px", "29.26px"],
//       "3xl": ["38px", "50px"],
//       "3_5xl": ["45px", "55px"],
//       "4xl": ["48px", "58px"],
//       "5xl": ["65px", "58px"],
//       "8xl": ["96px", "106px"],
//     },
//     extend: {
//       fontFamily: {
//         calsans: ["Cal Sans", "sans-serif"],
//         figtree: ["Figtree", "sans-serif"],
//         onest: ["Onest", " sans-serif"],
//         spacegrotesk: ["Space Grotes", "sans-serif"],
//       },
//       colors: {
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           hover: "#d4d4d4",
//           border: "#a3a3a3",
//           text: "#737373",
//           dark: "#262626",
//           darkHover: "#171717",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         background: "hsl(var(--background))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         "coral-red": "#FFa28a",
//         "slate-gray": "#525866",
//         "pale-brown": "#2E1109",
//         brown: "#9A391f",
//         "white-400": "rgba(255, 255, 255, 0.80)",
//         foreground: "hsl(var(--foreground))",
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         chart: {
//           1: "hsl(var(--chart-1))",
//           2: "hsl(var(--chart-2))",
//           3: "hsl(var(--chart-3))",
//           4: "hsl(var(--chart-4))",
//           5: "hsl(var(--chart-5))",
//         },
//       },
//       boxShadow: {
//         "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
//       },
//       screens: {
//         412: "412px",
//         414: "415px",
//         430: "430px",
//         640: "640px",
//         980: "978px",
//         1024: "1024px",
//         pro: "391px",
//         se: "376px",
//         iPadAir: "821px",
//         s8: "362px",
//         s20: "420px",
//       },
//       letterSpacing: {
//         text: "-0.04em",
//       },
//       lineHeight: {
//         text: "1",
//         "text-sm": "0.9",
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },

//       animation: {
//         move: "move 5s linear infinite",
//       },
//       keyframes: {
//         move: {
//           "0%": { transform: "translateX(-200px)" },
//           "100%": { transform: "translateX(200px)" },
//         },
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };