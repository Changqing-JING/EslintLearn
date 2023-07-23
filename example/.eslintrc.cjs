module.exports = {
    processor:"eslint-learn/.ts",
    parser: '@typescript-eslint/parser',
    plugins: ["eslint-learn"],
    extends: [
      
    ],
    rules: {
      "eslint-learn/noVar":"error"
    }
  };