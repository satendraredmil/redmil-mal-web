/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],

  theme: {
    extend: {
      minHeight: {
        '128': '32rem',
      }
    }
  }
}
