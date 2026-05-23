```markdown
# Corporate strategy agent — 配置说明

基于 Figma 设计稿的项目代码包。原始设计参考：[Figma 设计稿](https://www.figma.com/design/3mEO7ivNI9Y0dA2VZZJGX6/X-%E6%88%98%E7%95%A5agent)

---

## 项目结构概览

```text
Strategy-agent/
├── src/
│   ├── main.tsx             # React 入口
│   ├── app/                 # 应用页面与组件
│   └── styles/              # 全局样式
├── dist/                    # 构建产物
├── data/                    # 数据文件
├── docs/                    # 指南与文档
├── index.html               # 入口 HTML
├── package.json             # 依赖与脚本
├── pnpm-workspace.yaml      # PNPM workspace 配置
├── vite.config.ts           # Vite 构建配置
├── postcss.config.mjs       # PostCSS 配置（Tailwind v4 已自动处理）
└── default_shadcn_theme.css # Shadcn UI 默认主题变量

```

---

## 构建工具链

* **构建引擎**：Vite 6.3.5 （提供开发服务器与生产打包）
* **视图层框架**：React 18.3.1
* **类型系统**：TypeScript
* **CSS 方案**：Tailwind CSS 4.1.12 （v4 版本，零配置原子化样式）
* **后处理器**：PostCSS （Tailwind v4 会自动注册 PostCSS 插件）

---

## 关键配置项

### 1. Vite 配置 (`vite.config.ts`)

* **核心插件**：
* `figmaAssetResolver()`：自定义插件，负责拦截以 `figma:asset/` 开头的 import 请求，并自动映射到 `src/assets/` 目录下的实际文件。
* `react()`：React 官方插件（*必需，不可移除*）。
* `tailwindcss()`：Tailwind v4 官方 Vite 插件（*必需，不可移除*）。


* **路径别名（resolve.alias）**：
* `@` 统一映射至 `./src` 目录。


* **资产白名单（assetsInclude）**：
* 仅包含 `/*.svg` 和 `/*.csv`（*注意：不支持直接原始导入 .css / .tsx / .ts 文件*）。



### 2. 包管理器

项目采用 `pnpm` 进行多包/单包管理，`pnpm-workspace.yaml` 配置如下：

```yaml
packages:
  - '.' # 当前为单包模式，未来可无缝扩展为 Monorepo 架构

```

### 3. 全局 CSS 约定

* 以 **Tailwind v4** 类名为主，**MUI `sx` prop** 为辅助。
* 全局 CSS 变量在根目录的 `default_shadcn_theme.css` 中定义。

---

## 依赖分类

### 核心框架

* `react@18.3.1` / `react-dom@18.3.1`
* `react-router@7.13.0` （路由控制）

### UI 组件库（双体系并行）

* **MUI v7 体系**：`@mui/material`、`@mui/icons-material`、`@emotion/react`
* **Radix UI 体系**：引入 20+ 无头（Headless）组件（包括 `dialog`、`dropdown`、`popover`、`accordion` 等）。
* **Shadcn 风格生态**：搭配 `class-variance-authority` + `clsx` + `tailwind-merge` 实现高效的样式变体自定义。

### 可视化与交互

* `recharts@2.15.2` （数据图表）
* `motion@12.23.24` （丝滑动画）
* `react-dnd@16.0.1` （拖拽交互）
* `embla-carousel-react` （轮播组件）
* `canvas-confetti@1.9.4` （节日彩带特效）
* 响应式石砌瀑布流布局组件（Masonry Layout）

### 表单与工具函数

* `react-hook-form@7.55.0` （高性能表单校验）
* `input-otp` （OTP 验证码输入框）
* `sonner` / `vaul` （Toast 通知与抽屉组件）
* `lucide-react` （高品质图标集）
* `date-fns` （轻量级日期处理工具）

---

## 开发者启动指南

### 1. 进入工作目录

```bash
cd "具体工作目录"

```

### 2. 启动

```bash
 npm run dev

```

### 3.点击localhost

### 4. 核心代码约定示例

* **路径引用**：`@/components/xxx` 会被解析为 `src/components/xxx`。
* **Figma 资源引用**：
```typescript
import logo from 'figma:asset/logo.svg'; // 自动解析为 src/assets/logo.svg




```

```
