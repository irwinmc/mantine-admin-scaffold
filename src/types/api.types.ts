/**
 * API 相关类型定义
 */

export interface ApiResponse<T = any> {
	data: T;
	message: string;
	success: boolean;
}

export interface ApiError {
	message: string;
	code: string;
	status: number;
	errors?: Record<string, string[]>;
}

export interface PaginationParams {
	page: number;
	pageSize: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface SearchParams {
	query: string;
	filters?: Record<string, any>;
}

