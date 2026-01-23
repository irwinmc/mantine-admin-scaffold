import type { Category, CategoryWithLevel } from '../types';

export function flattenCategories(categories: Category[], expandedCategoryIds: number[]): CategoryWithLevel[] {
	const result: CategoryWithLevel[] = [];

	const flatten = (items: Category[], level = 0) => {
		items.forEach(category => {
			result.push({ ...category, level });
			if (category.children && category.children.length > 0 && expandedCategoryIds.includes(category.id)) {
				flatten(category.children, level + 1);
			}
		});
	};

	flatten(categories);
	return result;
}
