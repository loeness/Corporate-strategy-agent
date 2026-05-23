X-战略agent — 配置说明
========================

基于 Figma 设计稿的项目代码包
原始设计：https://www.figma.com/design/3mEO7ivNI9Y0dA2VZZJGX6/X-%E6%88%98%E7%95%A5agent


项目结构概览
-----------

Strategy agent/
├── index.html                  # 入口 HTML
├── package.json                # 依赖与脚本
├── pnpm-workspace.yaml         # pnpm workspace（单包）
├── vite.config.ts              # Vite 构建配置
├── postcss.config.mjs          # PostCSS（空，Tailwind v4 自动处理）
├── src/
│   ├── main.tsx                # React 入口
│   ├── app/                    # 应用页面/组件
│   └── styles/                 # 全局样式
├── dist/                       # 构建产物
├── data/
├── guidelines/
└── default_shadcn_theme.css


构建工具链
---------

  Vite        6.3.5   开发服务器 + 构建打包
  React       18.3.1  视图层
  TypeScript  —       类型系统
  Tailwind    4.1.12  原子化样式（v4，零配置）
  PostCSS     —       Tailwind v4 自动注册 PostCSS 插件


关键配置项
---------

1) Vite 配置（vite.config.ts）

  plugins:
    - figmaAssetResolver()      解析 figma:asset/ 路径 -> src/assets/
    - react()                   React 插件（必需，不可移除）
    - tailwindcss()             Tailwind v4 Vite 插件（同上，不可移除）

  resolve.alias:
    @ -> ./src

  assetsInclude:
    **/*.svg, **/*.csv

  figmaAssetResolver 自定义插件：拦截以 "figma:asset/" 开头的 import，
  自动映射到 src/assets/ 目录下的实际文件。

2) 包管理器

  项目使用 pnpm，配置文件 pnpm-workspace.yaml：
    packages:
      - '.'
  当前为单包模式，未来可扩展为 monorepo。

3) npm scripts

  pnpm dev   / npm run dev   启动 Vite 开发服务器
  pnpm build / npm run build 构建生产版本到 dist/


依赖分类
-------

核心框架：
  react@18.3.1, react-dom@18.3.1（peer 依赖）
  react-router@7.13.0（路由）

UI 组件库（两大体系并用）：
  MUI (Material UI) v7：@mui/material、@mui/icons-material、@emotion/react
  Radix UI：20+ 无头 UI 组件（dialog、dropdown、popover、accordion 等）
  shadcn 风格：default_shadcn_theme.css 提供默认主题变量
  搭配 class-variance-authority + clsx + tailwind-merge 自定义样式

可视化与交互：
  recharts@2.15.2          图表
  canvas-confetti@1.9.4    彩带动效
  motion@12.23.24          动画
  react-dnd@16.0.1         拖拽
  react-responsive-masonry 瀑布流布局
  embla-carousel-react     轮播

表单与工具：
  react-hook-form@7.55.0  表单
  input-otp                OTP 输入
  sonner                   通知 toast
  vaul                     抽屉组件
  lucide-react             图标集
  date-fns                 日期工具


启动方式
-------

  cd "C:\Users\EthanLi\Desktop\Strategy agent"

  pnpm install          # 安装依赖（首次）
  pnpm dev              # 启动开发服务器 -> http://localhost:5173
  pnpm build            # 构建生产版本 -> dist/


关键约定
-------

  - 路径别名：@/components/xxx 对应 src/components/xxx
  - Figma 资源引用：import logo from 'figma:asset/logo.svg'
    会被解析到 src/assets/logo.svg
  - CSS 方案：Tailwind v4 类名为主，MUI sx prop 辅助，
    全局变量在 default_shadcn_theme.css 中定义
  - assetsInclude 白名单仅为 *.svg 和 *.csv，
    不支持原始导入 .css / .tsx / .ts
