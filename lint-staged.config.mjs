/** @type {import('lint-staged').Configuration} */
const config = {
  "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": ["eslint --fix"],
};

export default config;
