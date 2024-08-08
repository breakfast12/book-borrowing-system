const globals = require('globals');
const pluginJs = require('@eslint/js');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 12,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
  },
  pluginJs.configs.recommended,
];
