/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-calc': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
