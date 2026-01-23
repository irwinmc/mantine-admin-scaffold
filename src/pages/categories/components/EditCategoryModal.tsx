import { Modal, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import type { Category, CategoryFormValues } from '../types';
import { CategoryForm } from './CategoryForm';

interface EditCategoryModalProps {
	opened: boolean;
	onClose: () => void;
	onSubmit: (values: CategoryFormValues) => void;
	category: Category | null;
	categories: Category[];
}

export function EditCategoryModal({ opened, onClose, onSubmit, category, categories }: EditCategoryModalProps) {
	const { t } = useTranslation();

	if (!category) {
		return null;
	}

	const initialValues: Partial<CategoryFormValues> = {
		name: category.name,
		slug: category.slug,
		description: category.description || '',
		image: category.image || '',
		parentId: category.parentId,
		sortOrder: category.sortOrder,
		status: category.status,
	};

	const handleSubmit = (values: CategoryFormValues) => {
		onSubmit(values);
	};

	return (
		<Modal opened={opened} onClose={onClose} title={<Text size="lg" fw={600}>{t('categories.edit_category')}</Text>} size="md" centered>
			<CategoryForm
				onSubmit={handleSubmit}
				onCancel={onClose}
				category={category}
				categories={categories}
				initialValues={initialValues}
			/>
		</Modal>
	);
}
