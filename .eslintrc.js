module.exports = {
  extends: [
    'vqzfss-vue'
  ],
  root: true,
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  rules: {
    "no-multi-spaces": "error",

    "no-trailing-spaces": "error",

    "indent": ["error", 2],

    "vue/no-v-html": "off",
  }
}