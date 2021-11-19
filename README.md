# eslint-plugin-vue-split-by-script-lang
The plugin allows to handle eslint configuration for a vue.js codebase with mixed languages, for example javascript and typescript.

## The Problem
Large codebases are usually migrated from javascript to typescript in stages. At the stage where Vue files exist with both languages, it is difficult to set up an eslint configuration that includes typescript rules, since it is only possible to filter by file names and extensions in eslint overloads. Since Vue single file components with ts and js have the same file extension, it is not possible to distinguish them directly by their script language. Therefore, the typescript rules apply to the javascript code as well.

## The Solution
As a solution, this package acts as an eslint processor which changes the file extension for non-javascript languages to `.<lang>vue` (e.g. for Typescript: `.tsvue`). This extension can then be used as a filter in an eslint override to add language-specific rules.

The credit for the idea goes to [mjeanroy in this Issue comment](https://github.com/vuejs/vue-eslint-parser/issues/49#issuecomment-806852933).

## install
`npm install -D eslint-plugin-vue-split-by-script-lang`  
or  
`yarn add -D eslint-plugin-vue-split-by-script-lang`
> `eslint` and `eslint-plugin-vue` are required peer-dependencies.

## setup 
```js
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: [
      '.vue'
    ]
  },

  plugins: [
    'vue-split-by-script-lang'
  ],

  extends: [
    'plugin:vue/essential'
  ],

  overrides: [
    {
      files: [
        '*.ts',
        '*.tsvue'
      ],

      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: [
          '.tsvue'
        ]
      },

      plugins: [
        '@typescript-eslint'
      ],

      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:vue/essential',
      ]
    }
  ]
}
```
