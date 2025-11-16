/**
 * Dashboard 模块类型定义
 */

export interface StatsCardData {
	title: string;
	value: string;
	diff: number;
	icon: React.ComponentType<{ size?: string | number; stroke?: number }>;
	color: string;
}

export interface RevenueData {
	month: string;
	revenue: number;
	orders: number;
}

export interface CategoryData {
	name: string;
	value: number;
	color: string;
	hexColor: string;
}

export interface TopProduct {
	name: string;
	sales: number;
	revenue: string;
	trend: number;
}

export interface RecentOrder {
	id: string;
	customer: string;
	product: string;
	amount: string;
	status: string;
	avatar: string;
}

