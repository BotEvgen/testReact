module.exports = {
   extends: [
      'airbnb',
      'airbnb/hooks',
      'airbnb-typescript',
      'plugin:import/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
   ],
   plugins: ['@typescript-eslint', 'import', 'react'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      project: ['./tsconfig.json'],
   },
   env: {
      es6: true,
      browser: true,
      node: true,
   },
   rules: {
      'import/extensions': [
         'error',
         'ignorePackages',
         {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
         },
      ],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
   },
   settings: {
      'import/resolver': {
         node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
         },
         alias: {
            map: [
               ['@', './src'],
               ['@pages', './src/pages'],
               ['@store', './src/store'],
               ['@sections', './src/sections'],
               ['@widgets', './src/widgets'],
               ['@ui', './src/ui'],
               ['@assets', './src/assets'],
               ['@hooks', './src/hooks'],
               ['@services', './src/services'],
               ['@modules', './src/modules'],
               ['@utils', './src/utils'],
               ['material-ui'],
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
         },
      },
      'import/parsers': {
         '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      react: {
         version: 'detect',
      },
   },
}
