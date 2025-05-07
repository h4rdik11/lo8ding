/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{ts,tsx,js,jsx,html}',
    'lo8ding-lib/src/**/*.{ts,tsx,js,jsx,html}',
  ],
  theme: { extend: {} },
  plugins: [],
  corePlugin: {
    preflight: false,
  },
};
