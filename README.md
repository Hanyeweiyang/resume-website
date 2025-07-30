# 个人简历网站

这是一个使用 Next.js 和 Tailwind CSS 构建的现代化个人简历网站项目，支持服务器端渲染和响应式布局。

## 预览图

### 首页

![预览图](public\readme-img\首页.png)

### 技能

![预览图](public\readme-img\技能.png)

### 项目

![预览图](public\readme-img\项目.png)

### 经验

![预览图](public\readme-img\经验.png)

### 联系

![预览图](public\readme-img\联系.png)

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

## 项目结构说明

- `/app` - Next.js 应用程序主目录
- `/components` - UI 组件和自定义组件
- `/contexts` - React 上下文，包括语言设置
- `/hooks` - 自定义 React 钩子
- `/services` - 后端服务接口，如汇率服务
- `/public` - 静态资源文件
- `/styles` - 全局样式定义

## 开发环境配置

### 前置要求

- Node.js 18.x 或更高版本
- pnpm (推荐) 或 npm, yarn

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/yourusername/resume-website.git
cd unit-converter

# 使用pnpm安装依赖
pnpm install
```

### 开发命令

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

## 部署信息

项目已部署在 Vercel 平台：

**[https://zjh-biographical-notes.vercel.app/](https://zjh-biographical-notes.vercel.app/)**

## 许可证

本项目采用 MIT 许可证
