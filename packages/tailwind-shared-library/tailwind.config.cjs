const tw = require('@butopen/design-system/tailwind.config');
module.exports = {
  content: [
    './index.html',
    './src/**/*.svelte'
  ],
  theme: {
    extend: { ...tw.theme.extend }
  },
  plugins: []
};
