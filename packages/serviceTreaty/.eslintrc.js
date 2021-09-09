// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    PUBLIC_PATH: true,
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-base'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      },
    },
  },
  rules: {
    'generator-star-spacing': [0],
    'consistent-return': [0],
    'global-require': [1],
    'import/prefer-default-export': [0],
    'no-else-return': [0],
    'no-restricted-syntax': [0],
    'import/no-extraneous-dependencies': [0],
    'arrow-parens': [0],
    'no-use-before-define': [0],
    'no-nested-ternary': [0],
    'arrow-body-style': [0],
    'no-bitwise': [0],
    'no-cond-assign': [0],
    'import/no-unresolved': [0],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'object-curly-newline': [0],
    'function-paren-newline': [0],
    'no-restricted-globals': [0],
    'require-yield': [1],
    'no-dupe-keys': 'error',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
