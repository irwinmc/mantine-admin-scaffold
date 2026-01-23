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
		<Modal.Root opened={opened} onClose={onClose} size="lg" centered>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>
						<Text size="lg" fw={600}>
							{t('categories.edit_category')}
						</Text>
					</Modal.Title>
					<Modal.CloseButton />
				</Modal.Header>
				<Modal.Body p={0}>
					<CategoryForm
						onSubmit={handleSubmit}
						onCancel={onClose}
						category={category}
						categories={categories}
						initialValues={initialValues}
					/>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}
