/**
 * Categories Store - 分类状态管理
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Category, CategoryFormValues } from './types';

interface CategoriesState {
	categories: Category[];
	loading: boolean;
	error: string | null;
}

interface CategoriesActions {
	setCategories: (categories: Category[]) => void;
	addCategory: (category: CategoryFormValues) => void;
	updateCategory: (id: number, category: Partial<CategoryFormValues>) => void;
	deleteCategory: (id: number) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
}

type CategoriesStore = CategoriesState & CategoriesActions;

// 模拟数据
const mockCategories: Category[] = [
	{
		id: 1,
		name: 'Electronics',
		slug: 'electronics',
		description: 'Electronic devices and accessories',
		image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
		parentId: 0,
		sortOrder: 1,
		status: 1,
		createdAt: new Date('2024-01-15'),
		updatedAt: new Date('2024-01-15'),
	},
	{
		id: 2,
		name: 'Smartphones',
		slug: 'smartphones',
		description: 'Mobile phones and accessories',
		image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
		parentId: 1,
		sortOrder: 1,
		status: 1,
		createdAt: new Date('2024-01-16'),
		updatedAt: new Date('2024-01-16'),
	},
	{
		id: 3,
		name: 'Laptops',
		slug: 'laptops',
		description: 'Portable computers and accessories',
		image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
		parentId: 1,
		sortOrder: 2,
		status: 1,
		createdAt: new Date('2024-01-17'),
		updatedAt: new Date('2024-01-17'),
	},
	{
		id: 4,
		name: 'Clothing',
		slug: 'clothing',
		description: 'Fashion and apparel',
		image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
		parentId: 0,
		sortOrder: 2,
		status: 1,
		createdAt: new Date('2024-01-18'),
		updatedAt: new Date('2024-01-18'),
	},
	{
		id: 5,
		name: "Men's Clothing",
		slug: 'mens-clothing',
		description: 'Clothing for men',
		image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
		parentId: 4,
		sortOrder: 1,
		status: 1,
		createdAt: new Date('2024-01-19'),
		updatedAt: new Date('2024-01-19'),
	},
	{
		id: 6,
		name: "Women's Clothing",
		slug: 'womens-clothing',
		description: 'Clothing for women',
		image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
		parentId: 4,
		sortOrder: 2,
		status: 1,
		createdAt: new Date('2024-01-20'),
		updatedAt: new Date('2024-01-20'),
	},
	{
		id: 7,
		name: 'Books',
		slug: 'books',
		description: 'Books and literature',
		image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
		parentId: 0,
		sortOrder: 3,
		status: 0,
		createdAt: new Date('2024-01-21'),
		updatedAt: new Date('2024-01-21'),
	},
];

export const useCategoriesStore = create<CategoriesStore>()(
	devtools(
		set => ({
			categories: mockCategories,
			loading: false,
			error: null,

			setCategories: categories => set({ categories }),

			addCategory: categoryData => {
				const newCategory: Category = {
					id: Date.now(), // 临时ID生成方式
					...categoryData,
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				set(state => ({
					categories: [...state.categories, newCategory],
				}));
			},

			updateCategory: (id, categoryData) => {
				set(state => ({
					categories: state.categories.map(category =>
						category.id === id ? { ...category, ...categoryData, updatedAt: new Date() } : category,
					),
				}));
			},

			deleteCategory: id => {
				set(state => ({
					categories: state.categories.filter(category => category.id !== id),
				}));
			},

			setLoading: loading => set({ loading }),
			setError: error => set({ error }),
		}),
		{ name: 'categories-store' },
	),
);

/**
 * 构建分类树形结构
 */
export const buildCategoryTree = (categories: Category[]): Category[] => {
	const categoryMap = new Map<number, Category>();
	const rootCategories: Category[] = [];

	// 创建分类映射并初始化children数组
	categories.forEach(category => {
		categoryMap.set(category.id, { ...category, children: [] });
	});

	// 构建树形结构
	categories.forEach(category => {
		const categoryWithChildren = categoryMap.get(category.id)!;

		if (category.parentId === 0) {
			// 根分类
			rootCategories.push(categoryWithChildren);
		} else {
			// 子分类
			const parent = categoryMap.get(category.parentId);
			if (parent) {
				parent.children!.push(categoryWithChildren);
			}
		}
	});

	// 按sortOrder排序
	const sortCategories = (cats: Category[]): Category[] => {
		return cats
			.sort((a, b) => a.sortOrder - b.sortOrder)
			.map(cat => ({
				...cat,
				children: cat.children ? sortCategories(cat.children) : [],
			}));
	};

	return sortCategories(rootCategories);
};
