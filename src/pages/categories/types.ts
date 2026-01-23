/**
 * Categories 模块类型定义
 */

/**
 * 分类
 */
export interface Category {
	id: number;
	name: string; // 分类名称
	slug: string; // URL友好标识符
	description?: string; // 分类描述
	image?: string; // 分类图片URL
	parentId: number; // 父分类ID（0为根分类）
	sortOrder: number; // 排序顺序
	status: number; // 状态（0: 停用, 1: 启用）
	createdAt?: Date; // 创建时间
	updatedAt?: Date; // 更新时间
	children?: Category[]; // 子分类（用于树形结构显示）
	parent?: Category; // 父分类信息
}

/**
 * 分类表单值
 */
export interface CategoryFormValues {
	name: string;
	slug: string;
	description?: string;
	image?: string;
	parentId: number;
	sortOrder: number;
	status: number;
}

/**
 * 分类状态常量
 */
export const CategoryStatus = {
	INACTIVE: 0,
	ACTIVE: 1,
} as const;

export type CategoryStatus = typeof CategoryStatus[keyof typeof CategoryStatus];

/**
 * 分类状态选项
 */
export const CATEGORY_STATUS_OPTIONS = [
	{ value: CategoryStatus.ACTIVE, label: 'Active' },
	{ value: CategoryStatus.INACTIVE, label: 'Inactive' },
] as const;