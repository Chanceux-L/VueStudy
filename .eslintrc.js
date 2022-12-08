module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin
  plugins: ['pathname', '@typescript-eslint'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // '@typescript-eslint/no-unused-vars': 1,
    'vue/no-v-html': 0,
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3
    }],
    'vue/require-default-prop': 0,
    'eqeqeq': 2,
    'quotes': [
      1,
      'single'
    ],
    'no-console': 1,
    'no-debugger': 1,
    'no-var': 2,
    'no-trailing-spaces': 2,
    'eol-last': 2,
    'no-alert': 2,
    'no-lone-blocks': 2,
    'key-spacing': 2,
    'comma-spacing': 2,
    'space-infix-ops': 2,
    'block-spacing': 2,
    'computed-property-spacing': 2,
    'func-call-spacing': 2,
    'keyword-spacing': 2,
    'switch-colon-spacing': 2,
    'arrow-spacing': 2,
    'rest-spread-spacing': 2,
    'space-in-parens': 2,
    'space-before-blocks': 2,
    'generator-star-spacing': [
      2,
      {
        'before': false,
        'after': true
      }
    ],
    'object-curly-spacing': [
      2,
      'always'
    ],
    'pathname/match-name': 2,
    'import/named': 0,
    'import/no-duplicates': 2,
    'import/no-unresolved': 0,
    'semi': 2,
    'curly': [2, 'all'],
    'require-atomic-updates': 0,
    'vue/valid-v-bind': 0,
    'vue/no-parsing-error': [2, {
      'invalid-first-character-of-tag-name': false
    }]
  },
};
