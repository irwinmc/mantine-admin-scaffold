/**
 * CategoryFormModal - 分类表单模态框（添加/编辑）
 */

import { useEffect } from 'react';
import { Modal, TextInput, Textarea, Select, NumberInput, Switch, Button, Group, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import type { Category, CategoryFormValues } from '../types';
import { CategoryStatus } from '../types';

interface CategoryFormModalProps {
	opened: boolean;
	onClose: () => void;
	onSubmit: (values: CategoryFormValues) => void;
	category?: Category | null; // 编辑时传入，添加时为null
	categories: Category[]; // 所有分类，用于构建父分类选项
	title: string;
}

export function CategoryFormModal({ opened, onClose, onSubmit, category, categories, title }: CategoryFormModalProps) {
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
		},
		validate: {
			name: value => (!value ? t('categories.name_required') : null),
			slug: value => (!value ? t('categories.slug_required') : null),
		},
	});

	// 当category变化时更新表单值
	useEffect(() => {
		if (category) {
			form.setValues({
				name: category.name,
				slug: category.slug,
				description: category.description || '',
				image: category.image || '',
				parentId: category.parentId,
				sortOrder: category.sortOrder,
				status: category.status,
			});
		} else {
			form.reset();
		}
	}, [category]);

	// 构建父分类选项 - 只显示根分类（parentId为0的分类）
	// 如果是编辑模式，还要排除自己和自己的子分类
	const getParentCategoryOptions = () => {
		const rootCategories = categories.filter(cat => cat.parentId === 0);

		let availableCategories = rootCategories;

		// 编辑模式：排除自己
		if (category) {
			availableCategories = availableCategories.filter(cat => cat.id !== category.id);
		}

		const options = [
			{ value: '0', label: t('categories.root_category') },
			...availableCategories.map(cat => ({
				value: cat.id.toString(),
				label: cat.name,
			})),
		];

		return options;
	};

	const handleSubmit = (values: CategoryFormValues) => {
		onSubmit(values);
		form.reset();
		onClose();
	};

	const handleClose = () => {
		form.reset();
		onClose();
	};

	// 根据名称自动生成slug
	const handleNameChange = (value: string) => {
		form.setFieldValue('name', value);
		if (!category) {
			// 只在添加模式下自动生成slug
			const slug = value
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, '') // 移除特殊字符
				.replace(/\s+/g, '-') // 空格替换为连字符
				.replace(/-+/g, '-') // 多个连字符合并为一个
				.trim();
			form.setFieldValue('slug', slug);
		}
	};

	return (
		<Modal
			opened={opened}
			onClose={handleClose}
			title={
				<Text size="lg" fw={600}>
					{title}
				</Text>
			}
			size="md"
			centered
		>
			<form onSubmit={form.onSubmit(handleSubmit)}>
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

					<Textarea
						label={t('categories.description')}
						placeholder={t('categories.description_placeholder')}
						rows={3}
						{...form.getInputProps('description')}
					/>

					<TextInput
						label={t('categories.image')}
						placeholder={t('categories.image_placeholder')}
						description={t('categories.image_description')}
						{...form.getInputProps('image')}
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

					<Group justify="flex-end" gap="sm" mt="lg">
						<Button variant="default" onClick={handleClose}>
							{t('common.cancel')}
						</Button>
						<Button type="submit">{category ? t('common.save') : t('common.create')}</Button>
					</Group>
				</Stack>
			</form>
		</Modal>
	);
}
