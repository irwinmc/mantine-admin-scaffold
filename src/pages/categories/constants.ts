/**
 * Categories 模块常量
 */

import { CategoryStatus } from './types';

/**
 * 分类状态映射
 */
export const CATEGORY_STATUS_MAP = {
	[CategoryStatus.ACTIVE]: {
		label: 'Active',
		color: 'green',
	},
	[CategoryStatus.INACTIVE]: {
		label: 'Inactive',
		color: 'gray',
	},
} as const;

/**
 * 默认分页大小
 */
export const DEFAULT_PAGE_SIZE = 10;

/**
 * 分页大小选项
 */
export const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

/**
 * 根分类ID
 */
export const ROOT_CATEGORY_ID = 0;