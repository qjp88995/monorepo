/**
 * @type {import("prettier").Config}
 * @see {@link https://www.prettier.cn/docs/options.html}
 */
export default {
  // 一行的最大长度
  printWidth: 120,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 使用单引号
  jsxSingleQuote: false,
  // 尾随逗号
  trailingComma: 'all',
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // 多行 HTML、Vue、JSX 元素的 > 放在最后一行的末尾，而不是单独一行
  bracketSameLine: false,
  // 箭头函数参数只有一个参数时，不需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化嵌入的内容
  embeddedLanguageFormatting: 'auto',
};
