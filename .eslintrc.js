module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      'airbnb-base',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
      firebase: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      'linebreak-style': 0,
      'prefer-destructuring': 0,
      'import/extensions': 0,
      'import/prefer-default-export': 0,
    }
}