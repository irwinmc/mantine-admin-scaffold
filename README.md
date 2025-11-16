# Mantine Admin v1

一个基于 React + TypeScript + Vite + Mantine 构建的现代化管理后台系统。

## 📋 项目简介

这是一个功能完整的管理后台模板，使用最新的前端技术栈构建，提供了丰富的组件和页面示例。

## ✨ 特性

-   🚀 **现代化技术栈** - React 19 + TypeScript + Vite
-   🎨 **Mantine UI** - 完整的 Mantine 组件库生态
-   📊 **数据可视化** - 内置图表组件（Recharts）
-   🌍 **国际化** - 支持多语言切换（中文、英文、日文）
-   🌓 **主题切换** - 完整的深色/浅色模式支持，自动检测系统偏好
-   📱 **响应式设计** - 完美支持移动端
-   🔐 **路由管理** - React Router v7
-   📦 **状态管理** - Zustand
-   🔍 **类型安全** - 完整的 TypeScript 支持

## 🛠 技术栈

### 核心框架

-   **React** ^19.2.0 - UI 框架
-   **TypeScript** ~5.9.3 - 类型系统
-   **Vite** ^7.2.2 - 构建工具
-   **React Router** ^7.9.6 - 路由管理

### UI 组件库

-   **@mantine/core** ^8.3.8 - 核心组件库
-   **@mantine/hooks** ^8.3.8 - React Hooks 工具集
-   **@mantine/charts** ^8.3.8 - 图表组件
-   **@mantine/dates** ^8.3.8 - 日期选择器
-   **@mantine/form** ^8.3.8 - 表单管理
-   **@mantine/notifications** ^8.3.8 - 通知组件
-   **@mantine/modals** ^8.3.8 - 模态框
-   **@mantine/dropzone** ^8.3.8 - 文件上传
-   **@mantine/spotlight** ^8.3.8 - 命令面板
-   **@mantine/carousel** ^8.3.8 - 轮播图
-   **@mantine/tiptap** ^8.3.8 - 富文本编辑器
-   **@mantine/code-highlight** ^8.3.8 - 代码高亮
-   **@mantine/nprogress** ^8.3.8 - 进度条

### 数据展示

-   **mantine-datatable** ^8.3.7 - 数据表格组件
-   **recharts** ^3.4.1 - 图表库

### 图标

-   **@tabler/icons-react** ^3.35.0 - 图标库

### 状态管理

-   **zustand** ^5.0.8 - 轻量级状态管理

### 国际化

-   **i18next** ^25.6.2 - 国际化框架
-   **react-i18next** ^16.3.3 - React 国际化

### 表单验证

-   **zod** ^4.1.12 - Schema 验证
-   **mantine-form-zod-resolver** ^1.3.0 - Mantine 表单验证器

### 工具库

-   **dayjs** ^1.11.19 - 日期处理
-   **clsx** ^2.1.1 - 类名工具
-   **embla-carousel-react** ^8.6.0 - 轮播组件

## 📁 项目结构

```
mantine-admin-v1/
├── public/                    # 静态资源
│   └── vite.svg
├── src/
│   ├── components/           # 组件目录
│   │   └── layout/          # 布局组件
│   │       ├── AppHeader.tsx      # 顶部导航栏
│   │       ├── AppNavbar.tsx      # 侧边导航栏
│   │       ├── AppFooter.tsx      # 页脚
│   │       └── DashboardLayout.tsx # 主布局容器
│   ├── hooks/               # 自定义 Hooks
│   ├── locale/              # 国际化配置
│   │   ├── index.ts         # i18n 初始化
│   │   └── lang/            # 语言包
│   │       ├── en.json      # 英文
│   │       ├── zh_cn.json   # 简体中文
│   │       └── jp.json      # 日文
│   ├── pages/               # 页面组件
│   │   ├── Dashboard.tsx    # 仪表板页面
│   │   ├── Analytics.tsx    # 分析页面
│   │   ├── Users.tsx        # 用户管理页面
│   │   └── Settings.tsx     # 设置页面
│   ├── routes/              # 路由配置
│   │   ├── index.tsx        # 路由入口
│   │   └── ProtectedRoute.tsx # 路由守卫
│   ├── App.tsx              # 应用入口
│   ├── main.tsx             # 主入口
│   ├── theme.ts             # 主题配置
│   └── index.css            # 全局样式
├── eslint.config.js         # ESLint 配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
├── postcss.config.cjs       # PostCSS 配置
├── package.json             # 项目依赖
└── pnpm-lock.yaml          # 锁定文件

```

## 🎯 核心功能

### 1. 布局系统

-   **自定义 Flexbox 布局** - 灵活的全屏布局系统
-   **可折叠导航栏** - 桌面端支持展开/折叠（280px ↔ 70px）
-   **响应式设计** - 完美支持桌面端和移动端
-   **Navbar 在最外层** - 左侧导航栏，Header/Footer 在右侧内容区
-   **平滑动画** - 所有交互都有流畅的过渡效果
-   **移动端遮罩** - 打开导航时显示半透明遮罩

### 2. 页面功能

#### Dashboard（仪表板）

-   📈 统计卡片 - 显示关键指标
-   📊 收入趋势图 - Area Chart 展示
-   🍩 销售分类 - Donut Chart 展示
-   📋 热门产品表格
-   📝 最近订单列表

#### Analytics（分析）

-   📉 流量趋势图 - Line/Bar Chart 切换
-   📱 设备分布 - Pie Chart
-   🔄 转化漏斗 - 垂直条形图

#### Users（用户管理）

-   👥 用户列表 - DataTable 展示
-   🔍 搜索过滤
-   🏷️ 角色和状态标签
-   ⚙️ 操作菜单

#### Settings（设置）

-   👤 个人资料设置
-   🌍 偏好设置（语言、时区、日期格式）
-   🔔 通知设置
-   🔒 安全设置

### 3. UI 特性

-   🎨 **完整的 Dark 模式支持**
    -   自动检测系统主题偏好
    -   一键切换深色/浅色模式
    -   所有组件完美适配
    -   优化的滚动条样式
    -   平滑的颜色过渡动画
-   🌍 多语言支持（中/英/日）
-   🔔 通知系统
-   👤 用户菜单
-   🔍 全局搜索
-   📱 完全响应式
-   🎯 可折叠导航栏（桌面端）
-   ✨ 彩色渐变导航背景
-   🎭 白色活动状态高亮
-   🔄 平滑的展开/折叠动画

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

## 📝 开发指南

### 添加新页面

1. 在 `src/pages/` 创建新的页面组件
2. 在 `src/routes/index.tsx` 添加路由配置
3. 在 `src/components/layout/AppNavbar.tsx` 添加导航项

### 添加新语言

1. 在 `src/locale/lang/` 创建新的语言文件
2. 在 `src/locale/index.ts` 导入并配置

### 主题自定义

编辑 `src/theme.ts` 文件来自定义主题配置

#### Dark 模式

应用支持完整的 Dark 模式，包括：

1. **自动检测**：应用会自动检测系统的主题偏好
2. **手动切换**：点击 Header 中的主题切换按钮（月亮/太阳图标）
3. **持久化**：主题选择会自动保存到 localStorage

**主要特性：**

-   🎨 所有组件自动适配
-   📜 优化的滚动条样式
-   🎯 精心调整的颜色对比度
-   ⚡ 平滑的主题切换动画
-   🌈 渐变导航栏自适应

**定制 Dark 模式：**

在 `src/index.css` 中修改 Dark 模式样式：

```css
/* Dark mode 自定义 */
[data-mantine-color-scheme='dark'] .your-class {
	background-color: var(--mantine-color-dark-7);
	color: var(--mantine-color-dark-0);
}
```

### 环境变量

创建 `.env` 文件：

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Mantine Admin
```

## 📦 组件使用示例

### 使用 DataTable

```tsx
import { DataTable } from 'mantine-datatable';

<DataTable
	records={data}
	columns={[
		{ accessor: 'name', title: 'Name' },
		{ accessor: 'email', title: 'Email' },
	]}
/>;
```

### 使用 Charts

```tsx
import { AreaChart } from '@mantine/charts';

<AreaChart data={data} dataKey="month" series={[{ name: 'revenue', label: 'Revenue', color: 'blue.6' }]} />;
```

## 🔧 配置说明

### ESLint 配置

项目使用 ESLint 9+ 的扁平化配置格式，配置文件为 `eslint.config.js`。

### TypeScript 配置

-   `tsconfig.json` - 主配置文件
-   `tsconfig.app.json` - 应用配置
-   `tsconfig.node.json` - Node 配置

### PostCSS 配置

使用 Mantine 的 PostCSS 预设：

-   `postcss-preset-mantine`
-   `postcss-simple-vars`

## 📚 参考文档

-   [Mantine Documentation](https://mantine.dev/)
-   [React Documentation](https://react.dev/)
-   [Vite Documentation](https://vitejs.dev/)
-   [React Router Documentation](https://reactrouter.com/)
-   [TypeScript Documentation](https://www.typescriptlang.org/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

Mantine Admin Team

## 🙏 鸣谢

感谢所有开源项目的贡献者！
