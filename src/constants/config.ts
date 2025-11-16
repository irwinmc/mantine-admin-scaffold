/**
 * 应用配置常量
 */

export const APP_CONFIG = {
	NAME: 'Mantine Admin',
	VERSION: '1.0.0',
	DESCRIPTION: 'Modern Admin Dashboard',
	AUTHOR: 'Mantine Admin Team',
} as const;

export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
	TIMEOUT: 30000,
	RETRY_COUNT: 3,
} as const;

export const STORAGE_KEYS = {
	AUTH_TOKEN: 'auth_token',
	REFRESH_TOKEN: 'refresh_token',
	USER_DATA: 'user_data',
	THEME: 'mantine_theme',
	LANGUAGE: 'app_language',
} as const;

export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_PAGE_SIZE: 10,
	PAGE_SIZE_OPTIONS: [5, 10, 15, 20, 50, 100],
} as const;

export const DATE_FORMATS = {
	DEFAULT: 'YYYY-MM-DD',
	DISPLAY: 'MMM DD, YYYY',
	FULL: 'YYYY-MM-DD HH:mm:ss',
	TIME: 'HH:mm:ss',
} as const;
