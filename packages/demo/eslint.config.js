import importPlugin from 'eslint-plugin-import'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import _preferArrowPlugin from 'eslint-plugin-prefer-arrow-functions'
import prettierPlugin from 'eslint-plugin-prettier'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

/** @type {any} */
const preferArrowPlugin =
  'default' in _preferArrowPlugin ? _preferArrowPlugin['default'] : _preferArrowPlugin

export default tseslint.config(
  {
    ignores: ['lib', 'node_modules', 'coverage', 'docs', '.yarn', '.husky', 'tmp']
  },
  {
    files: ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
      '@import': importPlugin,
      '@jsdoc': jsdocPlugin,
      '@prefer-arrow-functions': preferArrowPlugin,
      '@unused-imports': unusedImportsPlugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: 'tsconfig.json',
        projectService: {
          allowDefaultProject: ['.*']
        }
      }
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 90,
          semi: false,
          tabWidth: 2,
          useTabs: false,
          singleQuote: true,
          bracketSpacing: true,
          arrowParens: 'avoid',
          endOfLine: 'auto',
          trailingComma: 'none'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/object-literal-key-quotes': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-use-before-define': [
        1,
        {
          functions: false
        }
      ],
      '@jsdoc/check-alignment': 'off',
      '@jsdoc/no-types': 'off',
      '@jsdoc/tag-lines': [
        'off',
        'never',
        {
          startLines: 1
        }
      ],
      '@prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          allowNamedFunctions: true,
          classPropertiesAllowed: false,
          disallowPrototype: true,
          returnStyle: 'unchanged',
          singleReturnOnly: false
        }
      ],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
          readonly: 'generic'
        }
      ],
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: ['public-static-field', 'static-field', 'instance-field']
        }
      ],
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            Boolean: {
              message: 'Avoid using the `Boolean` type. Did you mean `boolean`?'
            },
            Function: {
              message:
                'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
            },
            Number: {
              message: 'Avoid using the `Number` type. Did you mean `number`?'
            },
            Object: {
              message: 'Avoid using the `Object` type. Did you mean `object`?'
            },
            String: {
              message: 'Avoid using the `String` type. Did you mean `string`?'
            },
            Symbol: {
              message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
            }
          }
        }
      ],
      '@typescript-eslint/no-shadow': [
        'error',
        {
          hoist: 'all'
        }
      ],
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/triple-slash-reference': [
        'error',
        {
          lib: 'always',
          path: 'always',
          types: 'prefer-import'
        }
      ],
      '@typescript-eslint/unified-signatures': 'error',
      '@unused-imports/no-unused-imports': 'error',
      '@unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_'
        }
      ],
      'arrow-body-style': ['error', 'as-needed'],
      complexity: 'off',
      'constructor-super': 'error',
      curly: 'off',
      eqeqeq: 'off',
      'id-match': 'off',
      'max-classes-per-file': 'off',
      'no-bitwise': 'off',
      'no-caller': 'error',
      'no-cond-assign': ['error', 'except-parens'],
      'no-console': 'off',
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': [
        'error',
        {
          includeExports: false
        }
      ],
      'no-empty': 'off',
      'no-eval': [
        'error',
        {
          allowIndirect: false
        }
      ],
      'no-extra-bind': 'error',
      'no-fallthrough': 'off',
      'no-invalid-this': 'off',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-redeclare': 'off',
      'no-restricted-imports': [
        'error',
        {
          message: "Please import directly from 'rxjs' instead",
          name: 'rxjs/Rx'
        }
      ],
      'no-return-await': 'error',
      'no-sequences': [
        'error',
        {
          allowInParentheses: true
        }
      ],
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'off',
      'no-unsafe-finally': 'error',
      'no-unused-labels': 'off',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false
        }
      ],
      'prefer-object-spread': 'error',
      radix: ['error', 'always'],
      'sort-keys': 'off',
      'use-isnan': [
        'error',
        {
          enforceForIndexOf: false,
          enforceForSwitchCase: true
        }
      ],
      'valid-typeof': 'off'
    }
  },
  {
    files: [
      '**/*.test.ts',
      '**/*.test.js',
      '**/*.config.js',
      '**/*.config.ts',
      '**/*.config.cjs',
      'test/*.cjs'
    ],
    rules: {
      '@import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true
        }
      ]
    }
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
)
