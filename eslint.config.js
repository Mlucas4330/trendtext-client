import globals from 'globals'
import pluginReact from 'eslint-plugin-react'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}']
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
      'semi': ['error', 'never'],
      'no-extra-semi': 'error'
    }
  },
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]