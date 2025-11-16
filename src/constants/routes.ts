/**
 * 路由常量定义
 */

export const ROUTES = {
	// 认证路由
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password',

	// 主要路由
	DASHBOARD: '/',
	ANALYTICS: '/analytics',

	// 用户管理
	USERS: '/users',
	USERS_LIST: '/users/list',
	USERS_ROLES: '/users/roles',
	USER_DETAIL: (id: number | string) => `/users/${id}`,

	// 产品管理
	PRODUCTS: '/products',
	PRODUCTS_NEW: '/products/new',
	PRODUCTS_EDIT: (id: number | string) => `/products/${id}/edit`,
	PRODUCTS_INVENTORY: '/products/inventory',
	PRODUCTS_CATEGORIES: '/products/categories',

	// 订单管理
	ORDERS: '/orders',
	ORDER_DETAIL: (id: number | string) => `/orders/${id}`,

	// 其他
	CALENDAR: '/calendar',
	MESSAGES: '/messages',
	SETTINGS: '/settings',
	NOTIFICATIONS: '/notifications',
} as const;
