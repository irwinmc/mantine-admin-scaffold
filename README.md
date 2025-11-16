# Mantine Admin v1

一个基于 React + TypeScript + Vite + Mantine 构建的现代化管理后台系统，采用 Feature-Based 架构。

## 📋 项目简介

这是一个功能完整的管理后台模板，使用最新的前端技术栈构建，提供了丰富的组件和页面示例。采用 Feature-Based 架构设计，代码组织清晰，易于维护和扩展。

## ✨ 特性

- 🚀 **现代化技术栈** - React 19 + TypeScript 5.9 + Vite 7
- 🏗️ **Feature-Based 架构** - 模块化设计，易维护易扩展
- 🎨 **Mantine UI** - 完整的 Mantine 8 组件库生态
- 📊 **数据可视化** - 内置图表组件（@mantine/charts + Recharts）
- 📋 **DataTable** - 强大的表格组件（mantine-datatable）
- 🌍 **国际化** - 支持多语言切换（中文、英文、日文）
- 🌓 **主题切换** - 完整的深色/浅色模式支持，自动检测系统偏好
- 📱 **响应式设计** - 完美支持移动端、平板、桌面
- 🔐 **路由管理** - React Router v7 + 路由守卫
- 📦 **状态管理** - Zustand + LocalStorage 持久化
- 🔍 **类型安全** - 100% TypeScript 支持
- ✅ **表单验证** - @mantine/form + Zod v4

## 🛠 技术栈

### 核心框架
- **React** ^19.2.0 - UI 框架
- **TypeScript** ~5.9.3 - 类型系统
- **Vite** ^7.2.2 - 构建工具
- **React Router** ^7.9.6 - 路由管理

### UI 组件库
- **@mantine/core** ^8.3.8 - 核心组件库
- **@mantine/hooks** ^8.3.8 - React Hooks 工具集
- **@mantine/charts** ^8.3.8 - 图表组件
- **@mantine/form** ^8.3.8 - 表单管理
- **mantine-datatable** ^8.3.7 - 数据表格组件

### 数据可视化
- **recharts** ^3.4.1 - 图表库
- **@tabler/icons-react** ^3.35.0 - 图标库

### 状态管理
- **zustand** ^5.0.8 - 轻量级状态管理

### 国际化
- **i18next** ^25.6.2 - 国际化框架
- **react-i18next** ^16.3.3 - React 国际化

### 表单验证
- **zod** ^4.1.12 - Schema 验证
- **mantine-form-zod-resolver** ^1.3.0 - Mantine 表单验证器

### 工具库
- **dayjs** ^1.11.19 - 日期处理
- **clsx** ^2.1.1 - 类名工具

## 📁 项目结构

```
mantine-admin-v1/
├── src/
│   ├── components/              # 布局组件
│   │   └── layout/
│   │       ├── AppHeader.tsx           # 顶部导航栏
│   │       ├── AppNavbar.tsx           # 侧边导航栏
│   │       ├── AppNavbar.module.css    # 导航栏样式
│   │       ├── AppFooter.tsx           # 页脚
│   │       ├── DashboardLayout.tsx     # 主布局容器
│   │       └── DashboardLayout.module.css # 布局样式
│   │
│   ├── constants/               # 常量定义 ✨
│   │   ├── index.ts                    # 导出所有常量
│   │   ├── routes.ts                   # 路由常量
│   │   ├── config.ts                   # 配置常量
│   │   └── product.constants.ts        # 产品常量
│   │
│   ├── hooks/                   # 自定义 Hooks ✨
│   │   ├── index.ts                    # 导出所有 Hooks
│   │   ├── useAuth.ts                  # 认证 Hook
│   │   ├── useLocalStorage.ts          # LocalStorage Hook
│   │   └── useDebounce.ts              # 防抖 Hook
│   │
│   ├── locale/                  # 国际化配置
│   │   ├── index.ts                    # i18n 初始化
│   │   └── lang/                       # 语言包
│   │       ├── en.json                 # 英文
│   │       ├── zh_cn.json              # 简体中文
│   │       └── jp.json                 # 日文
│   │
│   ├── pages/                   # Feature-Based 页面 ✨
│   │   ├── auth/                       # 认证模块
│   │   │   ├── Login/
│   │   │   │   ├── index.tsx
│   │   │   │   └── Login.module.css
│   │   │   └── Register/
│   │   │       └── index.tsx
│   │   │
│   │   ├── dashboard/                  # 仪表板模块
│   │   │   ├── components/             # 组件
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── RevenueChart.tsx
│   │   │   │   ├── SalesChart.tsx
│   │   │   │   ├── TopProductsTable.tsx
│   │   │   │   ├── RecentOrdersTable.tsx
│   │   │   │   └── index.ts
│   │   │   ├── data/
│   │   │   │   └── mockData.ts         # 模拟数据
│   │   │   ├── types.ts                # 类型定义
│   │   │   └── index.tsx               # 主页面
│   │   │
│   │   ├── products/                   # 产品模块
│   │   │   ├── ProductList/            # 产品列表
│   │   │   │   ├── data/
│   │   │   │   │   └── mockData.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── index.tsx
│   │   │   └── ProductEdit/            # 产品编辑
│   │   │       └── index.tsx
│   │   │
│   │   ├── analytics/                  # 分析模块
│   │   │   └── index.tsx
│   │   ├── users/                      # 用户模块
│   │   │   └── index.tsx
│   │   └── settings/                   # 设置模块
│   │       └── index.tsx
│   │
│   ├── routes/                  # 路由配置
│   │   ├── index.tsx                   # 路由入口
│   │   └── ProtectedRoute.tsx          # 路由守卫 ✨
│   │
│   ├── store/                   # 状态管理 ✨
│   │   ├── index.ts                    # Store 入口
│   │   ├── authStore.ts                # 认证状态
│   │   └── themeStore.ts               # 主题状态
│   │
│   ├── types/                   # 类型定义 ✨
│   │   ├── index.ts                    # 类型入口
│   │   ├── user.types.ts               # 用户类型
│   │   ├── product.types.ts            # 产品类型
│   │   └── api.types.ts                # API 类型
│   │
│   ├── utils/                   # 工具函数 ✨
│   │   ├── index.ts                    # 工具入口
│   │   ├── format.ts                   # 格式化工具
│   │   ├── validation.ts               # 验证工具
│   │   └── helpers.ts                  # 辅助工具
│   │
│   ├── App.tsx                  # 应用入口
│   ├── main.tsx                 # 主入口
│   ├── theme.ts                 # 主题配置
│   └── index.css                # 全局样式
│
├── CHANGELOG.md                 # 更新日志
├── README.md                    # 项目说明
├── eslint.config.js             # ESLint 配置
├── tsconfig.json                # TypeScript 配置
├── vite.config.ts               # Vite 配置
├── postcss.config.cjs           # PostCSS 配置
├── package.json                 # 项目依赖
└── pnpm-lock.yaml              # 锁定文件
```

## 🎯 核心功能

### 1. Feature-Based 架构

项目采用 Feature-Based 架构，按功能模块组织代码：

**优势**：
- 📦 **高度模块化** - 每个功能独立封装
- 🔍 **易于定位** - 相关代码集中在一起
- 🤝 **团队协作友好** - 减少代码冲突
- ♻️ **可复用性强** - 组件独立，易于复用
- 🧪 **易于测试** - 单元测试更简单

**示例 - Dashboard 模块**：
```
dashboard/
├── components/          # 5 个独立组件
├── data/mockData.ts    # 模拟数据
├── types.ts            # 类型定义
└── index.tsx           # 主页面（仅 42 行！）
```

### 2. 页面模块

#### 🏠 Dashboard（仪表板）
- 📈 统计卡片 - 关键指标展示
- 📊 收入趋势图 - Area Chart
- 🍩 销售分类 - Donut Chart（百分比显示）
- 📋 热门产品表格
- 📝 最近订单列表

#### 📊 Analytics（数据分析）
- 📉 流量趋势图 - Line/Bar Chart 切换
- 📱 设备分布 - Pie Chart
- 🔄 转化漏斗 - 垂直条形图

#### 📦 Products（产品管理）
- 📋 产品列表 - DataTable
- 🔍 搜索过滤
- 📊 排序功能（所有列）
- 📄 分页（5/10/15/20）
- ⚙️ 操作菜单（查看/编辑/删除）
- ➕ 新增/编辑产品（完整表单）

#### 👥 Users（用户管理）
- 👤 用户列表 - DataTable
- 🔍 搜索过滤
- 🏷️ 角色和状态标签
- ⚙️ 操作菜单

#### ⚙️ Settings（系统设置）
- 👤 个人资料设置
- 🌍 偏好设置（语言、时区、日期格式）
- 🔔 通知设置
- 🔒 安全设置

#### 🔐 Auth（认证）
- 🚪 登录页面（支持第三方登录）
- 📝 注册页面
- 🎨 精美的 UI 设计
- 🌗 Dark Mode 支持

### 3. 布局系统

- **自定义 Flexbox 布局** - 灵活的全屏布局
- **可折叠导航栏** - 280px ↔ 70px 平滑切换
- **响应式设计** - 移动端遮罩层，桌面端侧边栏
- **彩色渐变导航** - 蓝到青的优雅渐变
- **白色活动高亮** - 当前页面高亮显示
- **平滑动画** - 所有交互流畅过渡

### 4. 类型系统

**集中式类型管理** (`types/`):
```typescript
// 用户类型
import { User, UserRole } from '@/types/user.types';

// 产品类型
import { Product, ProductStatus } from '@/types/product.types';

// API 类型
import { ApiResponse, PaginatedResponse } from '@/types/api.types';
```

### 5. 常量管理

**统一常量定义** (`constants/`):
```typescript
// 路由常量
import { ROUTES } from '@/constants';
navigate(ROUTES.PRODUCTS_EDIT(id));

// 配置常量
import { API_BASE_URL, STORAGE_KEYS } from '@/constants';

// 产品常量
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from '@/constants';
```

### 6. 工具函数

**实用工具库** (`utils/`):
```typescript
// 格式化
formatCurrency(199.99);        // "$199.99"
formatDate(new Date());         // "Nov 16, 2025"
formatPercentage(15.5);         // "15.5%"

// 验证
isValidEmail('test@email.com'); // true
getPasswordStrength('Pass123!'); // 3

// 辅助
deepClone(obj);
groupBy(array, 'category');
downloadFile(data, 'export.json');
```

### 7. 状态管理

**Zustand + Persist** (`store/`):
```typescript
// 认证状态
import { useAuthStore } from '@/store';
const { user, login, logout } = useAuthStore();

// 主题状态
import { useThemeStore } from '@/store';
const { colorScheme, toggleTheme } = useThemeStore();
```

### 8. UI 特性

- 🎨 **完整的 Dark 模式**
  - 自动检测系统主题
  - 一键切换
  - 所有组件适配
  - 优化的滚动条
  - 平滑过渡动画

- 🌍 **国际化支持**
  - 中文、英文、日文
  - 动态切换
  - 完整翻译

- 📱 **响应式设计**
  - 移动端（< 768px）
  - 平板端（768px - 1024px）
  - 桌面端（> 1024px）

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

### 添加新页面（Feature-Based）

1. **创建 Feature 目录**
```bash
mkdir -p src/pages/orders
```

2. **创建页面文件**
```typescript
// src/pages/orders/index.tsx
export function Orders() {
  return <div>Orders Page</div>;
}
```

3. **添加路由**
```typescript
// src/routes/index.tsx
import { Orders } from '../pages/orders';

<Route path="orders" element={<Orders />} />
```

4. **添加导航**
```typescript
// src/components/layout/AppNavbar.tsx
{
  icon: IconShoppingCart,
  label: 'Orders',
  link: '/orders',
}
```

### 创建可复用组件

**在 Feature 内创建组件**：
```
pages/orders/
├── components/
│   ├── OrderCard.tsx
│   ├── OrderTable.tsx
│   └── index.ts
├── types.ts
├── data/mockData.ts
└── index.tsx
```

**导出组件**：
```typescript
// src/pages/orders/components/index.ts
export { OrderCard } from './OrderCard';
export { OrderTable } from './OrderTable';
```

**使用组件**：
```typescript
import { OrderCard, OrderTable } from './components';
```

### 添加新语言

1. 创建语言文件
```bash
# src/locale/lang/fr.json
```

2. 导入并配置
```typescript
// src/locale/index.ts
import fr from './lang/fr.json';
resources: { fr: { translation: fr } }
```

### 主题自定义

编辑 `src/theme.ts`：
```typescript
export const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily: 'Inter, sans-serif',
});
```

### Dark 模式定制

在 `src/index.css` 中：
```css
[data-mantine-color-scheme='dark'] .your-class {
  background-color: var(--mantine-color-dark-7);
}
```

## 📦 常用代码示例

### 使用 DataTable
```tsx
import { DataTable } from 'mantine-datatable';

<DataTable
  striped
  highlightOnHover
  records={records}
  columns={columns}
  sortStatus={sortStatus}
  onSortStatusChange={setSortStatus}
  page={page}
  onPageChange={setPage}
/>
```

### 使用 Charts
```tsx
import { ResponsiveContainer } from 'recharts';
import { AreaChart } from '@mantine/charts';

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data} dataKey="month" series={series} />
</ResponsiveContainer>
```

### 使用 Form + Zod
```tsx
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

const form = useForm({
  validate: zod4Resolver(schema),
  initialValues: { name: '', email: '' },
});
```

## 🔧 配置说明

### ESLint
使用 ESLint 9+ 扁平化配置 (`eslint.config.js`)

### TypeScript
- `tsconfig.json` - 主配置
- `tsconfig.app.json` - 应用配置
- `tsconfig.node.json` - Node 配置

### PostCSS
使用 Mantine 的 PostCSS 预设

## 📚 参考文档

- [Mantine Documentation](https://mantine.dev/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Zod Documentation](https://zod.dev/)

## 🎯 项目特点

### 代码质量
- ✅ 100% TypeScript
- ✅ ESLint 规范
- ✅ 模块化设计
- ✅ 单一职责原则
- ✅ DRY 原则

### 性能优化
- ⚡ ResponsiveContainer 图表
- 🎨 CSS 优化（cubic-bezier, will-change）
- 📊 useMemo 数据优化
- 🔄 防抖处理

### 开发体验
- 🔥 Vite 热更新
- 🔍 TypeScript 智能提示
- ✅ ESLint 实时检查
- 📁 清晰的目录结构

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有开源项目的贡献者！
