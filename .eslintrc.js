module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins  : [],
  'extends': [
    'plugin:vue/essential',
    "plugin:vue/recommended",
    'eslint:recommended'
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
}
