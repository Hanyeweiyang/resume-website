# 个人简历网站

这是一个使用 Next.js 和 Tailwind CSS 构建的现代化个人简历网站项目，支持服务器端渲染和响应式布局。

## 预览图

![预览图](./public/project/resume-website.png)

## 核心亮点

### 🎨 设计特性

- ✅ 响应式布局：适配 PC/平板/手机等所有设备
- ✅ 现代化 UI 设计：采用卡片式布局与微交互动效
- ✅ 可访问性优化：符合 WCAG 2.1 AA 标准

### ⚙️ 技术架构

- ✅ 组件化开发：所有 UI 元素均封装为可复用组件
- ✅ TypeScript：提供完整的类型定义和安全检查
- ✅ 模块化 CSS：通过 Tailwind CSS 实现原子化样式管理

### 🚀 开发体验

- ✅ 快速原型开发：支持热重载和实时预览
- ✅ 可维护性强：清晰的代码结构和模块划分
- ✅ 持续集成：内置构建和部署流程

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- PostCSS
- pnpm (包管理器)

## 项目结构

```
resume-website/
├── app/ # 应用程序主目录
├── components/ # 组件目录
├── hooks/ # 自定义钩子目录
├── public/ # 静态资源目录
├── styles/ # 样式目录
├── components.json # 组件配置文件
├── next-env.d.ts # Next.js 环境声明文件
├── next.config.mjs # Next.js 配置文件
├── package.json # 项目依赖配置
├── pnpm-lock.yaml # 依赖锁定文件
├── postcss.config.mjs # PostCSS 配置文件
├── tailwind.config.ts # Tailwind CSS 配置文件
└── tsconfig.json # TypeScript 配置文件

```

## 开发环境设置

克隆仓库到本地：

```bash
git clone https://github.com/yourusername/resume-website.git
```

安装依赖：

```bash
pnpm install
```

开发模式运行：

```bash
pnpm dev
```

构建生产环境：

```bash
pnpm build
```

预览生产环境：

```bash
pnpm start
```
