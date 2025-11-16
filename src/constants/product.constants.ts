/**
 * 产品相关常量
 */

export const PRODUCT_CATEGORIES = [
	{ value: 'electronics', label: 'Electronics' },
	{ value: 'clothing', label: 'Clothing' },
	{ value: 'food', label: 'Food' },
	{ value: 'books', label: 'Books' },
	{ value: 'toys', label: 'Toys' },
	{ value: 'sports', label: 'Sports' },
	{ value: 'home', label: 'Home & Garden' },
	{ value: 'others', label: 'Others' },
] as const;

export const PRODUCT_STATUS = [
	{ value: 'active', label: 'Active' },
	{ value: 'inactive', label: 'Inactive' },
	{ value: 'draft', label: 'Draft' },
] as const;

export const STOCK_THRESHOLDS = {
	OUT_OF_STOCK: 0,
	LOW_STOCK: 30,
} as const;

export const PRICE_LIMITS = {
	MIN: 0.01,
	MAX: 999999,
} as const;

export const IMAGE_CONFIG = {
	MAX_SIZE: 5 * 1024 * 1024, // 5MB
	ACCEPTED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
	ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;
