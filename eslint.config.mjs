import { FlatCompat }      from '@eslint/eslintrc';
import eslintJs            from '@eslint/js';                    //  ← preset recommandé
import angularEslint       from '@angular-eslint/eslint-plugin';
import angularTemplate     from '@angular-eslint/eslint-plugin-template';
import templateParser  from '@angular-eslint/template-parser';

import tseslint            from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory   : import.meta.dirname,             // résolution des « extends » CJS
  recommendedConfig: eslintJs.configs.recommended,   //  ← ***obligatoire*** depuis v2.1
});

export default [
  // ► règles de base ESLint + TS + Angular (_compat gère la conversion_)
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/recommended'
  ),

  // ► Fichiers TypeScript
  {
    files: ['**/*.ts'],
     languageOptions: {
      parser: templateParser,          // parseur HTML Angular
    },
    languageOptions: {
      parser       : tseslint.parser,
      parserOptions: {
        project           : ['./tsconfig.json'],
        tsconfigRootDir   : import.meta.dirname,
        sourceType        : 'module',
      },
    },
    plugins: {
      '@angular-eslint'         : angularEslint,
      '@angular-eslint/template': angularTemplate,
      /* pas besoin de redéfinir @typescript-eslint : déjà créé par les presets */
    },
    rules: {
       '@angular-eslint/prefer-inject'  : 'off',   // on verra plus tard
 '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // ► Templates HTML (Angular)
  {
    files    : ['**/*.html'],
    plugins  : { '@angular-eslint/template': angularTemplate },
    processor: angularTemplate.processors['extract-inline-html'],
  },
];
