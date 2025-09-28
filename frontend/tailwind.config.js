/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        reddit: {
          orange: '#FF4500',
          blue: '#0079D3',
          darkblue: '#0066CC',
          lightgray: '#F6F7F8',
          darkgray: '#1A1A1B',
          gray: '#787C82',
          black: '#000000',
          white: '#FFFFFF'
        },
        neon: {
          cyan: '#00FFFF',
          purple: '#8B5CF6',
          pink: '#EC4899',
          green: '#10B981'
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'futura': ['Futura', 'sans-serif']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px #FF4500, 0 0 10px #FF4500, 0 0 15px #FF4500',
          },
          '100%': { 
            boxShadow: '0 0 10px #FF4500, 0 0 20px #FF4500, 0 0 30px #FF4500',
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'reddit-gradient': 'linear-gradient(135deg, #FF4500 0%, #0079D3 50%, #FF4500 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #0079D3 0%, #8B5CF6 50%, #FF4500 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}