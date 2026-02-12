/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#E07B39',
          'orange-hover': '#C86A2E',
        },
        bg: {
          cream: '#FDF6F0',
          orange: '#F5DCC7',
        },
        success: {
          green: '#2E5A4C',
          'green-light': '#E8F5E9',
        },
        // Updated colors from UI/UX spec
        'primary-orange': '#E07B39',
        'primary-orange-hover': '#C86A2E',
        'background-cream': '#FDF6F0',
        'success-green': '#008A4B',
        'success-green-light': '#E8F5E9',
        'warning-amber': '#D48C24',
        'critical-red': '#D92626',
        'calm-blue': '#005084',
        'ink': '#1A2026',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
