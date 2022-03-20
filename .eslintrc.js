module.exports = {
  env: {
    node: true,
  },
  rules: {
    'no-console': "off",
    indent: ["error", 2],
    quotes: ["error", "single"],
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  eslintConfig: {
    parser: "babel-eslint",
  },
};
