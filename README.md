# monorepo

## 工具 - pnpm

初始化 package.json

```bash
pnpm -w init
```

## 环境版本锁定

package.json

```json
{
  ...
  "engines": {
    "node": ">=22.13.1",
    "npm": ">=11.2.0",
    "pnpm": ">=10.5.2"
  },
  ...
}
```

## TypeScript

安装依赖

```bash
pnpm add -Dw typescript @types/node
```

添加配置文件 `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "ESNext",
    "module": "ESNext",
    "types": [],
    "lib": ["ESNext"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "verbatimModuleSyntax": false,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipDefaultLibCheck": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "exclude": ["node_modules", "dist"]
}
```

## 代码风格与质量检查

### prettier

安装依赖

```bash
pnpm add -Dw prettier
```

添加配置文件 `prettier.config.js` 和 `.prettierignore`

```js
// prettier.config.js
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
```

```
# .prettierignore

dist
public
node_modules
.local
pnpm-lock.yaml
```

添加 `package.json` 脚本

```json
{
  ...
  "scripts": {
    ...
    "lint:prettier": "prettier --write \"**/*.{js,ts,mjs,cjs,json,jsx,tsx,css,less,scss,vue,html,md}\""
  },
  ...
}
```

执行脚本

```bash
pnpm run lint:prettier
```

### ESLint

安装依赖

```bash
pnpm -Dw add eslint @eslint/js globals typescript-eslint eslint-plugin-prettier eslint-config-prettier eslint-plugin-vue eslint-plugin-react eslint-plugin-react-hooks @eslint-react/eslint-plugin eslint-plugin-react-you-might-not-need-an-effect
```

| 类别 | 库名 |
| --- |--- |
| 核心引擎 | eslint |
| 官方规则集 | @eslint/js |
| 全局变量支持 | globals |
| TypeScript 支持 | typescript-eslint |
| 类型定义（辅助） | @types/node |
| Prettier 集成 | eslint-plugin-prettier eslint-config-prettier |
| Vue.js 支持 | eslint-plugin-vue |
| React 支持 | eslint-plugin-react <br> eslint-plugin-react-hooks <br> @eslint-react/eslint-plugin <br> eslint-plugin-react-you-might-not-need-an-effect |

添加配置文件 `eslint.config.js`

```js
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';

const ignores = ['**/dist/**', '**/node_modules/**', '.*', 'scripts/**', '**/*.d.ts'];

export default defineConfig(
  // 通用配置
  {
    ignores, // 忽略文件
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ecmaVersion: 'latest', // 语法支持到最新
      sourceType: 'module', // 代码是 ECMAScript 模块
      parser: tseslint.parser, // 解析器
    },
    rules: {
      // 自定义
      'no-var': 'error', // 禁止使用 var
    },
  },
  // 前端配置
  {
    ignores,
    files: ['apps/frontend/**/*.{js,ts,jsx,tsx,vue}', 'packages/components/**/*.{js,ts,jsx,tsx,vue}'],
    extends: [...eslintPluginVue.configs['flat/recommended'], eslintConfigPrettier],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  // 后端配置
  {
    ignores,
    files: ['apps/backend/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
```

添加 `package.json` 脚本

```json
{
  ...
  "scripts": {
    ...
    "lint:eslint": "eslint"
  },
  ...
}
```

### 拼写检查

vscode 插件： `Code Spell Checker`

安装依赖

```bash
pnpm add -Dw cspell @cspell/dict-lorem-ipsum
```

添加配置文件 `cspell.json`

```json
{
  "import": ["@cspell/dict-lorem-ipsum/cspell-ext.json"],
  "caseSensitive": false,
  "dictionaries": ["custom-dictionary"],
  "dictionaryDefinitions": [
    {
      "name": "custom-dictionary",
      "path": "./.cspell/custom-dictionary.txt",
      "addWords": true
    }
  ],
  "ignorePaths": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/lib/**",
    "**/docs/**",
    "**/vendor/**",
    "**/public/**",
    "**/static/**",
    "**/out/**",
    "**/tmp/**",
    "**/*.d.ts",
    "**/package.json",
    "**/*.md",
    "**/stats.html",
    "eslint.config.js",
    ".gitignore",
    ".prettierignore",
    "cspell.json",
    "commitlint.config.js",
    ".cspell"
  ]
}
```

创建自定义字典

```bash
mkdir -p .cspell && touch .cspell/custom-dictionary.txt
```

添加 `package.json` 脚本

```json
{
  ...
  "lint:spellcheck": "cspell lint \"(packages|apps)/**/*.{js,ts,mjs,cjs,json,jsx,tsx,css,less,scss,vue,html,md}\""
  ...
}
```

## Git 提交规范

添加配置文件 `.gitignore`

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.*
!.env.example

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next
out

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Sveltekit cache directory
.svelte-kit/

# vitepress build output
**/.vitepress/dist

# vitepress cache directory
**/.vitepress/cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# Firebase cache directory
.firebase/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v3
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# Vite logs files
vite.config.js.timestamp-*
vite.config.ts.timestamp-*
```

初始化仓库

```bash
git init
```

### commitizen

安装依赖

```bash
pnpm add -Dw @commitlint/cli @commitlint/config-conventional commitizen cz-git
```

- `@commitlint/cli` 是 `commitlint` 工具的核心
- `@commitlint/config-conventional` 是基于 `conventional commits` 规范的配置文件
- `commitizen` 提供了一个交互式撰写 commit 信息的插件
- `cz-git` 是国人开发的工具，工程性更强，自定义更高，交互性更好

添加 `package.json` 配置

```json
{
  ...
  "scripts": {
    ...
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  },
  ...
}
```

添加 cz-git 配置文件 `commitlint.config.js`

```js
/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see https://commitlint.js.org/#/reference-rules
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'wip',
        'workflow',
        'types',
        'release',
      ],
    ],
  },
  prompt: {
    types: [
      { value: 'feat', name: '⭐️ 新功能：新增功能' },
      { value: 'fix', name: '🐛 修复：修复缺陷' },
      { value: 'docs', name: '📝 文档：文档变更' },
      { value: 'refactor', name: '💡 重构：代码重构（不新增功能也不修复 bug）' },
      { value: 'perf', name: '⚡️ 性能：性能优化' },
      { value: 'test', name: '✅ 测试：添加测试' },
      { value: 'chore', name: '🔧 工具：更改构建流程或辅助工具' },
      { value: 'revert', name: '⏪️ 回滚：代码回滚' },
      { value: 'style', name: '💄 格式：代码格式调整（不影响代码运行）' },
    ],
    scopes: ['root', 'backend', 'frontend', 'components', 'utils'],
    allowCustomScopes: true,
    skipQuestions: ['body', 'footerPrefix', 'footer', 'breaking'],
    messages: {
      type: '🚀 请选择提交类型:',
      scope: '🔧 请选择影响范围（可选）:',
      subject: '📝 请简要描述更改:',
      body: '🔍 详细描述（可选）:',
      footer: '🔗 关联的 ISSUE 或 BREAKING CHANGE（可选）:',
      confirmCommit: '✅ 确认提交?',
    },
  },
};
```

### husky

### lint-staged
