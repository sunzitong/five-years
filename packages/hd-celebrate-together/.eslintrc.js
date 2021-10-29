// 配置参考：http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    node: true
  },
  // 扩展一个流行的风格指南，即 eslint-config-standard
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // 全局变量在此处加入生命，避免eslint校验
  globals: {
    'BMap': true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'eqeqeq': 0, // 剔除必须使用全等
    //'default-case': 2,
    'space-before-function-paren': [0, 'always'] // 函数定义时括号前面要不要有空格
  },
  overrides: [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off",
        "vue/script-indent": ["error", 2, {"baseIndent": 1}]
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
