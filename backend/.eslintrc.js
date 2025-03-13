export default {
  env: {
    browser: false,  // Backend doesn't use a browser
    es2021: true,
    node: true,      // Enables process.env, global, __dirname, etc.
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module", // Ensures ES module compatibility
  },
  rules: {
    "no-undef": "off", // Prevents ESLint from flagging process.env
    "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Allows unused args like _next in middleware
  }
};
