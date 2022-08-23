/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/standard'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  rules: {
    'no-unused-vars': 'off'
  }
}
