import { Modal, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import type { Category, CategoryFormValues } from '../types';
import { CategoryForm } from './CategoryForm';

interface CreateCategoryModalProps {
	opened: boolean;
	onClose: () => void;
	onSubmit: (values: CategoryFormValues) => void;
	categories: Category[];
}

export function CreateCategoryModal({ opened, onClose, onSubmit, categories }: CreateCategoryModalProps) {
	const { t } = useTranslation();

	const handleSubmit = (values: CategoryFormValues) => {
		onSubmit(values);
		onClose();
	};

	return (
		<Modal opened={opened} onClose={onClose} title={<Text size="lg" fw={600}>{t('categories.create_category')}</Text>} size="md" centered>
			<CategoryForm onSubmit={handleSubmit} onCancel={onClose} categories={categories} />
		</Modal>
	);
}
