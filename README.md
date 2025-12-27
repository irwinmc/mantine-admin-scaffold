# Mantine Admin v1

一个基于 React + TypeScript + Vite + Mantine 构建的现代化管理后台系统，采用 Feature-Based 架构。

## 🎯 项目概览

| 项目 | 详情 |
|------|------|
| **框架** | React 19 + TypeScript 5.9 + Vite 7 |
| **UI库** | Mantine 8 + Recharts + mantine-datatable |
| **架构** | Feature-Based（模块化设计） |
| **状态管理** | Zustand + LocalStorage 持久化 |
| **国际化** | i18next（中文、英文、日文） |
| **表单验证** | Mantine Form + Zod |
| **路由** | React Router v7 + 路由守卫 |
| **样式** | CSS Module + Dark Mode 支持 |

## ✨ 核心特性

- 📦 **Feature-Based 架构** - 按功能模块组织代码，易维护易扩展
- 🎨 **完整 Dark Mode** - 自动检测系统主题，平滑过渡
- 🌍 **多语言支持** - 中文、英文、日文动态切换
- 📊 **数据可视化** - 内置 Area Chart、Donut Chart、Bar Chart 等
- 📋 **DataTable** - 强大的表格组件，支持排序、分页、搜索
- 📱 **响应式设计** - 完美支持移动端、平板、桌面
- 🔐 **类型安全** - 100% TypeScript，全程类型保护
- 🚀 **高性能** - Vite 快速构建，useMemo 数据优化

## 📁 项目结构

```
src/
├── components/              # 布局组件
│   ├── layout/             # 主布局（Header、Navbar、Footer）
│   └── common/             # 通用组件（SectionCard 等）
│
├── pages/                  # Feature-Based 页面
│   ├── dashboard/          # 仪表板（统计卡片、图表、表格）
│   ├── products/           # 产品管理（列表、创建、编辑）
│   ├── users/              # 用户管理（列表、搜索、过滤）
│   ├── settings/           # 系统设置（个人资料、偏好设置）
│   └── auth/               # 认证（登录、注册）
│
├── store/                  # 状态管理
│   ├── pageTitleStore.ts   # 页面标题管理
│   ├── authStore.ts        # 认证状态
│   └── themeStore.ts       # 主题状态
│
├── hooks/                  # 自定义 Hooks
│   ├── usePageTitle.ts     # 页面标题 Hook
│   ├── useAuth.ts          # 认证 Hook
│   └── ...
│
├── locale/                 # 国际化配置
│   └── lang/               # 语言包（en.json、zh_cn.json、jp.json）
│
├── types/                  # 类型定义
├── utils/                  # 工具函数
├── constants/              # 常量定义
├── routes/                 # 路由配置
├── theme.ts                # 主题配置
└── App.tsx                 # 应用入口
```

## 🏠 已实现页面

| 页面 | 功能 | 状态 |
|------|------|------|
| **Dashboard** | 统计卡片、收入趋势图、销售分类、热门产品、最近订单 | ✅ 完成 |
| **Products** | 列表、搜索、排序、分页、新增、编辑、删除 | ✅ 完成 |
| **Users** | 列表、搜索、角色/状态标签、操作菜单 | ✅ 完成 |
| **Settings** | 个人资料、语言选择、通知设置、安全设置 | ✅ 完成 |
| **Auth** | 登录、注册、Dark Mode 支持 | ✅ 完成 |

## 🎨 UI 布局

### 导航栏（AppNavbar）
- **背景颜色** - Light: 白色 | Dark: dark-7
- **右侧边框** - 分隔线效果，带阴影
- **选中状态** - 淡灰色背景 + 黑色文字/图标
- **未选中图标** - 灰色，选中时变填充样式（如 IconGauge → IconGaugeFilled）
- **Hover 效果** - 浅灰色背景

### Header（AppHeader）
- **样式** - 悬浮式，有小圆角和阴影
- **位置** - sticky，固定在 mainContainer 顶部
- **高度** - 60px
- **内容** - 缩放按钮 + 动态页面标题 + 功能按钮（主题切换、通知、语言、用户菜单）

### 主内容区（mainContainer）
- **背景颜色** - Light: gray-1 | Dark: dark-8
- **滚动** - 在 mainContainer 级别，Header/Footer 保持固定
- **Padding** - xl 内边距

### Card 样式
- **背景** - 白色（light）/ dark-7（dark）
- **边框** - 1px solid gray-3（light）/ dark-4（dark）
- **阴影** - `0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)`
- **圆角** - `md`

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

## 🔧 关键技术说明

### Feature-Based 架构

每个功能模块独立管理：
```
pages/products/
├── components/         # 产品专用组件
├── data/              # 模拟数据
├── store/             # 产品状态管理
├── types.ts           # 产品类型定义
├── schemas.ts         # 表单验证 Schema
└── index.tsx          # 主页面
```

**优势**：
- 代码高度内聚，相关文件集中
- 易于团队协作，减少代码冲突
- 功能独立，易于测试和维护

### 状态管理（Zustand）

```typescript
// 页面标题管理
const pageTitle = usePageTitleStore(state => state.title);

// 产品管理
const products = useProductsStore(state => state.products);
const addProduct = useProductsStore(state => state.addProduct);
```

### 国际化（i18next）

在页面中使用翻译：
```typescript
const { t } = useTranslation();
usePageTitle(t('nav.dashboard'));  // 自动更新页面标题
```

### 页面标题管理

```typescript
// 每个页面通过 Hook 自动设置标题，显示在 Header 中
import { usePageTitle } from '@/hooks/usePageTitle';

export function Dashboard() {
  usePageTitle(t('nav.dashboard'));  // 设置标题为 "Dashboard"
  // ...
}
```

## 📝 开发指南

### 添加新页面

1. 创建 Feature 目录：`src/pages/feature-name/`
2. 创建页面文件：`src/pages/feature-name/index.tsx`
3. 添加路由：`src/routes/index.tsx`
4. 设置标题：`usePageTitle(t('nav.feature'))`
5. 添加导航项：`src/components/layout/AppNavbar.tsx`

### 创建可复用组件

组件放在 Feature 内部的 `components/` 目录：
```typescript
export function ComponentName() {
  // 组件逻辑
}

// 通过 index.ts 导出
export { ComponentName } from './ComponentName';
```

### 添加表单验证

使用 Zod + Mantine Form：
```typescript
import { z } from 'zod';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';

const schema = z.object({
  name: z.string().min(2, '名称至少2个字符'),
  email: z.string().email('邮箱格式不正确'),
});

const form = useForm({
  validate: zod4Resolver(schema),
  initialValues: { name: '', email: '' },
});
```

### Dark Mode 适配

在 CSS Module 中使用：
```css
.header {
  background-color: var(--mantine-color-white);
  border-bottom: 1px solid var(--mantine-color-gray-3);
}

[data-mantine-color-scheme='dark'] .header {
  background-color: var(--mantine-color-dark-7);
  border-bottom: 1px solid var(--mantine-color-dark-4);
}
```

## 🎯 常见需求

### 修改主题颜色

编辑 `src/theme.ts`：
```typescript
export default createTheme({
  primaryColor: 'blue',  // 修改主要色
  defaultRadius: 'md',
  // ... 其他配置
});
```

### 添加新语言

1. 创建语言文件：`src/locale/lang/fr.json`
2. 导入配置：`src/locale/index.ts`
3. 在语言菜单中添加选项

### 使用 DataTable

```typescript
import { DataTable } from 'mantine-datatable';

<DataTable
  records={records}
  columns={columns}
  sortStatus={sortStatus}
  onSortStatusChange={setSortStatus}
  page={page}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
/>
```

### 使用图表

```typescript
import { AreaChart } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data} dataKey="month" series={series} />
</ResponsiveContainer>
```

## 📚 依赖版本

| 依赖 | 版本 |
|-----|------|
| React | ^19.2.0 |
| TypeScript | ~5.9.3 |
| Vite | ^7.2.2 |
| Mantine | ^8.3.8 |
| React Router | ^7.9.6 |
| Zustand | ^5.0.8 |
| i18next | ^25.6.2 |
| Zod | ^4.1.12 |
| Recharts | ^3.4.1 |

## 🔐 安全特性

- ✅ 路由守卫（Protected Routes）
- ✅ 100% TypeScript 类型检查
- ✅ Zod 数据验证
- ✅ XSS 防护（React 内置）

## 📊 性能指标

- ⚡ **Vite 开发模式** - 秒级启动和热更新
- 🎯 **代码分割** - 按路由动态加载
- 💾 **本地存储缓存** - 主题、认证信息持久化
- 🔄 **防抖处理** - 搜索、输入防抖优化
- 📈 **useMemo 优化** - 表格数据、图表数据缓存

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**最后更新**：2025-12-27
