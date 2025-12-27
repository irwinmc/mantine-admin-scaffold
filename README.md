# Mantine Admin v1

A modern admin dashboard built with React + TypeScript + Vite + Mantine, using Feature-Based architecture.

## Project Overview

| Aspect | Details |
|--------|---------|
| **Framework** | React 19 + TypeScript 5.9 + Vite 7 |
| **UI Library** | Mantine 8 + Recharts + mantine-datatable |
| **Architecture** | Feature-Based (Modular Design) |
| **State Management** | Zustand + LocalStorage Persistence |
| **Internationalization** | i18next (English, Chinese, Japanese) |
| **Form Validation** | Mantine Form + Zod |
| **Routing** | React Router v7 + Route Guards |
| **Styling** | CSS Modules + Dark Mode Support |

## Core Features

- **Feature-Based Architecture** - Code organized by feature modules for easy maintenance and extension
- **Complete Dark Mode** - Automatic system theme detection with smooth transitions
- **Multi-Language Support** - Dynamic switching between English, Chinese, and Japanese
- **Data Visualization** - Built-in Area Chart, Donut Chart, Bar Chart, etc.
- **DataTable** - Powerful table component with sorting, pagination, and search
- **Responsive Design** - Perfect support for mobile, tablet, and desktop
- **Type Safety** - 100% TypeScript with comprehensive type protection
- **High Performance** - Fast Vite builds with useMemo data optimization

## Project Structure

```
src/
├── components/              # Layout components
│   ├── layout/             # Main layout (Header, Navbar, Footer)
│   └── common/             # Common components (SectionCard, etc.)
│
├── pages/                  # Feature-Based pages
│   ├── dashboard/          # Dashboard (stats, charts, tables)
│   ├── products/           # Product management (list, create, edit)
│   ├── users/              # User management (list, search, filter)
│   ├── settings/           # Settings (profile, preferences)
│   └── auth/               # Authentication (login, register)
│
├── store/                  # State management
│   ├── pageTitleStore.ts   # Page title management
│   ├── authStore.ts        # Authentication state
│   └── themeStore.ts       # Theme state
│
├── hooks/                  # Custom hooks
│   ├── usePageTitle.ts     # Page title hook
│   ├── useAuth.ts          # Authentication hook
│   └── ...
│
├── locale/                 # Internationalization config
│   └── lang/               # Language files (en.json, zh_cn.json, jp.json)
│
├── types/                  # Type definitions
├── utils/                  # Utility functions
├── constants/              # Constants
├── routes/                 # Route configuration
├── theme.ts                # Theme configuration
└── App.tsx                 # Application entry point
```

## Implemented Pages

| Page | Features | Status |
|------|----------|--------|
| **Dashboard** | Stats cards, revenue trends, sales categories, top products, recent orders | Complete |
| **Products** | List, search, sort, paginate, create, edit, delete | Complete |
| **Users** | List, search, role/status badges, action menu | Complete |
| **Settings** | Profile, language selection, notification settings, security settings | Complete |
| **Auth** | Login, register, dark mode support | Complete |

## UI Layout Details

### Navigation Bar (AppNavbar)
- **Background Color** - Light: white | Dark: dark-7
- **Right Border** - Separator with shadow effect
- **Selected State** - Light gray background + black text/icons
- **Unselected Icons** - Gray, filled when selected (e.g., IconGauge → IconGaugeFilled)
- **Hover Effect** - Light gray background

### Header (AppHeader)
- **Style** - Floating with small rounded corners and shadow
- **Position** - Sticky, fixed at top of mainContainer
- **Height** - 60px
- **Content** - Collapse button + dynamic page title + action buttons (theme toggle, notifications, language, user menu)

### Main Content Area (mainContainer)
- **Background Color** - Light: gray-1 | Dark: dark-8
- **Scrolling** - Occurs in mainContainer level, Header/Footer remain fixed
- **Padding** - xl spacing

### Card Styling
- **Background** - White (light) / dark-7 (dark)
- **Border** - 1px solid gray-3 (light) / dark-4 (dark)
- **Shadow** - 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
- **Border Radius** - md

## Quick Start

### Install Dependencies
```bash
pnpm install
```

### Development Mode
```bash
pnpm dev
```
Access http://localhost:5173

### Build Production Version
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

### Lint Code
```bash
pnpm lint
```

## Key Technologies

### Feature-Based Architecture

Each feature module is independently managed:
```
pages/products/
├── components/         # Product-specific components
├── data/              # Mock data
├── store/             # Product state management
├── types.ts           # Product type definitions
├── schemas.ts         # Form validation schemas
└── index.tsx          # Main page component
```

**Benefits:**
- High code cohesion with related files grouped together
- Easy team collaboration with reduced code conflicts
- Independent features for easier testing and maintenance

### State Management (Zustand)

```typescript
// Page title management
const pageTitle = usePageTitleStore(state => state.title);

// Product management
const products = useProductsStore(state => state.products);
const addProduct = useProductsStore(state => state.addProduct);
```

### Internationalization (i18next)

Using translations in pages:
```typescript
const { t } = useTranslation();
usePageTitle(t('nav.dashboard'));  // Automatically updates page title
```

### Page Title Management

Each page automatically sets its title via hook, displayed in Header:
```typescript
import { usePageTitle } from '@/hooks/usePageTitle';

export function Dashboard() {
  usePageTitle(t('nav.dashboard'));  // Sets title to "Dashboard"
  // ...
}
```

## Development Guide

### Adding a New Page

1. Create feature directory: `src/pages/feature-name/`
2. Create page file: `src/pages/feature-name/index.tsx`
3. Add route: `src/routes/index.tsx`
4. Set title: `usePageTitle(t('nav.feature'))`
5. Add navigation item: `src/components/layout/AppNavbar.tsx`

### Creating Reusable Components

Components are placed in feature's `components/` directory:
```typescript
export function ComponentName() {
  // Component logic
}

// Export via index.ts
export { ComponentName } from './ComponentName';
```

### Adding Form Validation

Using Zod + Mantine Form:
```typescript
import { z } from 'zod';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
});

const form = useForm({
  validate: zod4Resolver(schema),
  initialValues: { name: '', email: '' },
});
```

### Dark Mode Adaptation

Using CSS Modules:
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

## Common Tasks

### Change Theme Color

Edit `src/theme.ts`:
```typescript
export default createTheme({
  primaryColor: 'blue',  // Change primary color
  defaultRadius: 'md',
  // ... other configurations
});
```

### Add a New Language

1. Create language file: `src/locale/lang/fr.json`
2. Import in config: `src/locale/index.ts`
3. Add option to language menu

### Using DataTable

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

### Using Charts

```typescript
import { AreaChart } from '@mantine/charts';
import { ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data} dataKey="month" series={series} />
</ResponsiveContainer>
```

## Dependencies

| Dependency | Version |
|------------|---------|
| React | ^19.2.0 |
| TypeScript | ~5.9.3 |
| Vite | ^7.2.2 |
| Mantine | ^8.3.8 |
| React Router | ^7.9.6 |
| Zustand | ^5.0.8 |
| i18next | ^25.6.2 |
| Zod | ^4.1.12 |
| Recharts | ^3.4.1 |

## Security Features

- Route guards (Protected Routes)
- 100% TypeScript type checking
- Zod data validation
- XSS protection (React built-in)

## Performance Optimizations

- Fast development mode with Vite - second-level startup and hot updates
- Code splitting - dynamic loading by route
- LocalStorage caching - theme and authentication persistence
- Debouncing - search and input optimization
- useMemo optimization - table and chart data caching

## Contributing

Issues and pull requests are welcome!

## License

MIT License

---

Last Updated: 2025-12-27
