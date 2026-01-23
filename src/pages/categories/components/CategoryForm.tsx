import { TextInput, Textarea, Select, NumberInput, Switch, Button, Group, Stack } from '@mantine/core';
import { useState } from 'react';
import { IconInfoCircle, IconPhoto } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import type { Category, CategoryFormValues } from '../types';
import { CategoryStatus } from '../types';
import classes from './CategoryForm.module.css';

interface CategoryFormProps {
	onSubmit: (values: CategoryFormValues) => void;
	onCancel: () => void;
	category?: Category | null;
	categories: Category[];
	initialValues?: Partial<CategoryFormValues>;
}

export function CategoryForm({ onSubmit, onCancel, category, categories, initialValues }: CategoryFormProps) {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<'required' | 'optional'>('required');

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

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<div className={classes.modalContainer}>
				{/* 左侧导航 */}
				<div className={classes.sidebar}>
					<Stack gap="xs">
						<button
							type="button"
							className={`${classes.menuItem} ${activeTab === 'required' ? classes.menuItemActive : ''}`}
							onClick={() => setActiveTab('required')}
						>
							<IconInfoCircle size={16} />
							{t('categories.required_fields')}
						</button>
						<button
							type="button"
							className={`${classes.menuItem} ${activeTab === 'optional' ? classes.menuItemActive : ''}`}
							onClick={() => setActiveTab('optional')}
						>
							<IconPhoto size={16} />
							{t('categories.optional_fields')}
						</button>
					</Stack>
				</div>

				{/* 右侧内容区域 */}
				<div className={classes.content}>
					<div className={classes.scrollContainer}>
						{activeTab === 'required' && (
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
						)}

						{activeTab === 'optional' && (
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
						)}
					</div>

					{/* 底部按钮区域 */}
					<div className={classes.footer}>
						<Group justify="flex-end" gap="sm">
							<Button variant="default" onClick={onCancel}>
								{t('common.cancel')}
							</Button>
							<Button type="submit">{category || initialValues ? t('common.save') : t('common.create')}</Button>
						</Group>
					</div>
				</div>
			</div>
		</form>
	);
}
