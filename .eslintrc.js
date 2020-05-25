module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins  : ["@typescript-eslint"],
  'extends': [
    'plugin:vue/essential',
    "plugin:vue/recommended",
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended",
    '@vue/typescript'
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
}
