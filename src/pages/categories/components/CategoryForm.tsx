import { TextInput, Textarea, Select, NumberInput, Switch, Stack } from '@mantine/core';
import { IconInfoCircle, IconPhoto } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import type { Category, CategoryFormValues } from '../types';
import { CategoryStatus } from '../types';
import { TabbedForm } from '../../../components';

interface CategoryFormProps {
	onSubmit: (values: CategoryFormValues) => void;
	onCancel: () => void;
	category?: Category | null;
	categories: Category[];
	initialValues?: Partial<CategoryFormValues>;
}

export function CategoryForm({ onSubmit, onCancel, category, categories, initialValues }: CategoryFormProps) {
	const { t } = useTranslation();

	const form = useForm<CategoryFormValues>({
		initialValues: {
			name: '',
			slug: '',
			description: '',
			image: '',
			parentId: 0,
			sortOrder: 0,
			status: CategoryStatus.ACTIVE,
			...initialValues,
		},
		validate: {
			name: value => (!value ? t('categories.name_required') : null),
			slug: value => (!value ? t('categories.slug_required') : null),
		},
	});

	// 构建父分类选项
	const getParentCategoryOptions = () => {
		const rootCategories = categories.filter(cat => cat.parentId === 0);

		let availableCategories = rootCategories;

		if (category) {
			availableCategories = availableCategories.filter(cat => cat.id !== category.id);
		}

		return [
			{ value: '0', label: t('categories.root_category') },
			...availableCategories.map(cat => ({
				value: cat.id.toString(),
				label: cat.name,
			})),
		];
	};

	const handleSubmit = (values: CategoryFormValues) => {
		onSubmit(values);
		form.reset();
	};

	const handleNameChange = (value: string) => {
		form.setFieldValue('name', value);
		if (!category && !initialValues) {
			const slug = value
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '')
				.replace(/\s+/g, '-')
				.replace(/-+/g, '-')
				.trim();
			form.setFieldValue('slug', slug);
		}
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.onSubmit(handleSubmit)(e);
	};

	return (
		<TabbedForm onSubmit={handleFormSubmit} onCancel={onCancel}>
			<TabbedForm.Tabs>
				<TabbedForm.Tab value="required" icon={<IconInfoCircle size={16} />}>
					{t('categories.required_fields')}
				</TabbedForm.Tab>
				<TabbedForm.Tab value="optional" icon={<IconPhoto size={16} />}>
					{t('categories.optional_fields')}
				</TabbedForm.Tab>
			</TabbedForm.Tabs>

			<TabbedForm.Content>
				<TabbedForm.Panel value="required">
					<Stack gap="md">
						<TextInput
							label={t('categories.name')}
							placeholder={t('categories.name_placeholder')}
							required
							{...form.getInputProps('name')}
							onChange={e => handleNameChange(e.currentTarget.value)}
						/>

						<TextInput
							label={t('categories.slug')}
							placeholder={t('categories.slug_placeholder')}
							description={t('categories.slug_description')}
							required
							{...form.getInputProps('slug')}
						/>

						<Select
							label={t('categories.parent_category')}
							placeholder={t('categories.parent_category_placeholder')}
							data={getParentCategoryOptions()}
							{...form.getInputProps('parentId')}
							onChange={value => form.setFieldValue('parentId', parseInt(value || '0'))}
							value={form.values.parentId.toString()}
						/>

						<NumberInput
							label={t('categories.sort_order')}
							placeholder={t('categories.sort_order_placeholder')}
							description={t('categories.sort_order_description')}
							min={0}
							{...form.getInputProps('sortOrder')}
						/>

						<Switch
							label={t('categories.status_active')}
							description={t('categories.status_description')}
							checked={form.values.status === CategoryStatus.ACTIVE}
							onChange={event =>
								form.setFieldValue(
									'status',
									event.currentTarget.checked ? CategoryStatus.ACTIVE : CategoryStatus.INACTIVE,
								)
							}
						/>
					</Stack>
				</TabbedForm.Panel>

				<TabbedForm.Panel value="optional">
					<Stack gap="md">
						<Textarea
							label={t('categories.description')}
							placeholder={t('categories.description_placeholder')}
							rows={6}
							{...form.getInputProps('description')}
						/>

						<TextInput
							label={t('categories.image')}
							placeholder={t('categories.image_placeholder')}
							description={t('categories.image_description')}
							{...form.getInputProps('image')}
						/>
					</Stack>
				</TabbedForm.Panel>
			</TabbedForm.Content>
		</TabbedForm>
	);
}
