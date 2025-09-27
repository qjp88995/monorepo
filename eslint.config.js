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
