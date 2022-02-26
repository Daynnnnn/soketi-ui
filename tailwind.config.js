module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.svelte",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
            '0%, 100%': {
                transform: 'rotate(-2deg)'
            },
            '50%': {
                transform: 'rotate(2deg)'
            },
        }
      },
      animation: {
          wiggle: 'wiggle .15s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
