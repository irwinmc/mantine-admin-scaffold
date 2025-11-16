/**
 * Dashboard 模拟数据
 */

import {
	IconUsers,
	IconShoppingCart,
	IconCurrencyDollar,
	IconTrendingUp,
} from '@tabler/icons-react';
import type { StatsCardData, RevenueData, CategoryData, TopProduct, RecentOrder } from '../types';

export const statsData: StatsCardData[] = [
	{
		title: 'dashboard.total_users',
		value: '13,456',
		diff: 12.5,
		icon: IconUsers,
		color: 'blue',
	},
	{
		title: 'dashboard.total_orders',
		value: '2,345',
		diff: 8.3,
		icon: IconShoppingCart,
		color: 'cyan',
	},
	{
		title: 'dashboard.total_revenue',
		value: '$18,765',
		diff: -3.1,
		icon: IconCurrencyDollar,
		color: 'teal',
	},
	{
		title: 'dashboard.growth',
		value: '2.7%',
		diff: 5.2,
		icon: IconTrendingUp,
		color: 'violet',
	},
];

export const revenueData: RevenueData[] = [
	{ month: 'Jan', revenue: 4000, orders: 240 },
	{ month: 'Feb', revenue: 3000, orders: 198 },
	{ month: 'Mar', revenue: 5000, orders: 300 },
	{ month: 'Apr', revenue: 4500, orders: 280 },
	{ month: 'May', revenue: 6000, orders: 350 },
	{ month: 'Jun', revenue: 5500, orders: 320 },
	{ month: 'Jul', revenue: 7000, orders: 400 },
];

export const categoryData: CategoryData[] = [
	{ name: 'Electronics', value: 2400, color: 'blue.6', hexColor: '#228be6' },
	{ name: 'Clothing', value: 1800, color: 'cyan.6', hexColor: '#15aabf' },
	{ name: 'Food', value: 1200, color: 'green.6', hexColor: '#40c057' },
	{ name: 'Books', value: 800, color: 'violet.6', hexColor: '#7950f2' },
	{ name: 'Others', value: 600, color: 'orange.6', hexColor: '#fd7e14' },
];

export const topProducts: TopProduct[] = [
	{
		name: 'Wireless Headphones',
		sales: 1200,
		revenue: '$120,000',
		trend: 15,
	},
	{ name: 'Smart Watch', sales: 950, revenue: '$95,000', trend: 8 },
	{ name: 'Portable Speaker', sales: 800, revenue: '$80,000', trend: -5 },
	{ name: 'Gaming Mouse', sales: 720, revenue: '$72,000', trend: 10 },
	{ name: 'USB-C Hub', sales: 600, revenue: '$60,000', trend: 3 },
];

export const recentOrders: RecentOrder[] = [
	{
		id: '#12345',
		customer: 'John Doe',
		product: 'Wireless Headphones',
		amount: '$199',
		status: 'Completed',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
	},
	{
		id: '#12346',
		customer: 'Jane Smith',
		product: 'Smart Watch',
		amount: '$299',
		status: 'Processing',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
	},
	{
		id: '#12347',
		customer: 'Bob Johnson',
		product: 'Laptop Stand',
		amount: '$79',
		status: 'Shipped',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
	},
	{
		id: '#12348',
		customer: 'Alice Williams',
		product: 'USB-C Cable',
		amount: '$19',
		status: 'Completed',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
	},
	{
		id: '#12349',
		customer: 'Charlie Brown',
		product: 'Desk Mat',
		amount: '$45',
		status: 'Pending',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
	},
];

