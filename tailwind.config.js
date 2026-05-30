module.exports = {
  purge: ['./public/index.html', './src/**/*.{ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: '#00454d',
        panel: '#f3f1ef',
      },
      minWidth: {
        button: '2rem',
        control: '7rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
