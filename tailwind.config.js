module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#D0D5DD #F9FAFB'
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#D0D5DD',
            marginTop: '5px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#F9FAFB',
            borderRadius: '100vw',
            width: '6px'
          }
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  theme: {
    extend: {
      flexGrow: {
        2: '2',
        3: '3'
      },
      fontFamily: {
        inter: ['inter', 'sans-serif'],
        shoreline: ['shoreline', 'sans-serif']
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 85px 65px rgba(0, 0, 0, 0.15)'
        ],
        '5xl': '0px 0px 63px 26px rgba(16, 24, 40, 0.24)',
        '6xl': '-8px -8px 20px 0px rgba(0, 0, 0, 0.16);'
      },
      boxShadow: {
        '6xl': '-8px -8px 20px 0px rgba(0, 0, 0, 0.16);',
        '7xl':
          '0px 0px 0px 5.09091px #F4EBFF, 0px 1.27273px 2.54545px 0px rgba(16, 24, 40, 0.05);'
      },
      colors: {
        overlay: 'rgba(52, 64, 84, 0.7)',
        primary: '#7F56D9',
        secondary: '#F9F5FF',
        'gray-lightest': '#f9fafb',
        'gray-subheader': '#98A2B3',
        'gray-background': '#F2F4F7',
        'gray-row-dark': '#333F53',
        'yt-card': '#293056',
        'purple-card': '#7F56D9',
        'primary-btn': {
          100: '#D8B4FE',
          200: '#C084F5',
          300: '#A855F7',
          400: '#9333EA',
          500: '#7F56D9', // Base Color
          600: '#6B21A8'
        }
      }
    }
  }
}
