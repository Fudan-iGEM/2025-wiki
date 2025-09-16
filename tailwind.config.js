/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./.vitepress/**/*.{js,ts,jsx,tsx,vue,md}",
    "./.vitepress/components/*",
    "./src/**/*.{vue,js,ts,jsx,tsx,md}"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  theme: {
    extend: {
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'heading': ['Josefin Sans', 'sans-serif'],
        'body': ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f8f7',
          100: '#b2eeeb',
          200: '#5dcac6',
          300: '#0e9f99',
          400: '#008794',
          500: '#007a86',
          600: '#006b78',
          700: '#005c6a',
          800: '#004d5c',
          900: '#003e4e',
        },
        accent: {
          50: '#fef8f3',
          100: '#faccaf',
          200: '#ffb07b',
          300: '#e97e35',
          400: '#d67230',
          500: '#c3652b',
          600: '#b05926',
          700: '#9d4c21',
          800: '#8a401c',
          900: '#773317',
        },
        secondary: {
          50: '#e6f2fe',
          100: '#d4e8fc',
          200: '#a8d1f9',
          300: '#7cbaf6',
          400: '#50a3f3',
          500: '#248cf0',
          600: '#062570',
          700: '#051f5a',
          800: '#041944',
          900: '#03132e',
        },
        highlight: '#fff771',
        warning: '#ffd237',
        success: '#6fbe02',
        tech: {
          primary: '#008794',
          secondary: '#0e9f99',
          accent: '#5dcac6',
          dark: '#062570',
          light: '#e6f2fe',
          orange: '#e97e35',
          'orange-light': '#ffb07b',
          'orange-lighter': '#faccaf',
          highlight: '#fff771',
          success: '#6fbe02',
        }
      },
      gradients: {
        'primary': 'linear-gradient(135deg, #008794 0%, #0e9f99 100%)',
        'accent': 'linear-gradient(135deg, #e97e35 0%, #ffb07b 100%)',
        'tech': 'linear-gradient(135deg, #008794 0%, #0e9f99 50%, #5dcac6 100%)',
        'background': 'linear-gradient(135deg, #ffffff 0%, #e6f2fe 100%)',
      },
      boxShadow: {
        'tech': '0 4px 20px rgba(0, 135, 148, 0.15)',
        'tech-lg': '0 8px 32px rgba(0, 135, 148, 0.2)',
        'accent': '0 4px 20px rgba(233, 126, 53, 0.15)',
        'accent-lg': '0 8px 32px rgba(233, 126, 53, 0.2)',
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': {
            'box-shadow': '0 0 20px rgba(0, 135, 148, 0.3)',
          },
          'to': {
            'box-shadow': '0 0 30px rgba(0, 135, 148, 0.6)',
          },
        },
      },
    },
  },
  plugins: [],
}
