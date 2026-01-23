import { useMemo } from 'react';
import type { CategoryWithLevel } from '../types';

export function useCategoryFilter(
	flatCategories: CategoryWithLevel[],
	search: string
) {
	return useMemo(() => {
		return flatCategories.filter(
			category =>
				category.name.toLowerCase().includes(search.toLowerCase()) ||
				category.slug.toLowerCase().includes(search.toLowerCase()) ||
				(category.description && category.description.toLowerCase().includes(search.toLowerCase()))
		);
	}, [flatCategories, search]);
}
