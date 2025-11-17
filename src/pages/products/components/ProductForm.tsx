/**
 * ProductEdit Form 组件
 */

import type { UseFormReturnType } from '@mantine/form';
import {
	Card,
	TextInput,
	Textarea,
	Select,
	Button,
	Group,
	Stack,
	Grid,
	Switch,
	Badge,
	Box,
	Text,
	useMantineColorScheme,
} from '@mantine/core';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { ProductFormValues } from '../schemas';
import type { ProductVariant } from '../types';
import { categoryOptions, statusOptions } from '../constants';
import { ProductImageCard } from './ProductImageCard';
import { ProductVariantsCard } from './ProductVariantsCard';

interface ProductFormProps {
	// 基础属性
	form: UseFormReturnType<ProductFormValues>;
	isEditMode: boolean;
	id?: string;
	// 数据属性
	variants: ProductVariant[];
	images: string[];
	createdAt?: Date;
	updatedAt?: Date;
	views?: number;
	// 函数回调
	onSubmit: (values: ProductFormValues) => void;
	onCancel: () => void;
	onVariantsChange: (variants: ProductVariant[]) => void;
	onImagesChange: (images: string[]) => void;
}

export function ProductForm({
	form,
	isEditMode,
	id,
	variants,
	images,
	createdAt,
	updatedAt,
	views,
	onSubmit,
	onCancel,
	onVariantsChange,
	onImagesChange,
}: ProductFormProps) {
	const { t } = useTranslation();
	const { colorScheme } = useMantineColorScheme();

	// 翻译选项
	const translatedCategoryOptions = categoryOptions.map(option => ({
		value: option.value,
		label: t(`product_edit.category_${option.value}`),
	}));

	const translatedStatusOptions = statusOptions.map(option => ({
		value: option.value,
		label: t(`product_edit.${option.value}_status`),
	}));

	return (
		<>
			{/* Header */}
			<Group justify="space-between">
				<Group>
					<Button variant="subtle" leftSection={<IconArrowLeft size={16} />} onClick={onCancel}>
						{t('common.back')}
					</Button>
					<Text size="xl" fw={700}>
						{isEditMode ? t('product_edit.edit_product') : t('product_edit.add_new_product')}
					</Text>
					{isEditMode && (
						<Badge variant="light" color="blue">
							ID: {id}
						</Badge>
					)}
				</Group>
			</Group>

			<form onSubmit={form.onSubmit(onSubmit)}>
				<Grid gutter="lg">
					{/* 左侧 - 主要信息 */}
					<Grid.Col span={{ base: 12, md: 8 }}>
						<Stack gap="lg">
							{/* 基本信息 */}
							<Card shadow="sm" radius="md" withBorder padding={0} style={{ overflow: 'hidden' }}>
								<Box
									p="md"
									bg={colorScheme === 'dark' ? 'dark.6' : 'gray.1'}
									style={{
										borderBottom: `1px solid ${
											colorScheme === 'dark'
												? 'var(--mantine-color-dark-4)'
												: 'var(--mantine-color-gray-3)'
										}`,
									}}
								>
									<Text size="md" fw={600} c={colorScheme === 'dark' ? 'gray.3' : 'gray.8'}>
										{t('product_edit.basic_information')}
									</Text>
								</Box>
								<Box p="lg" bg={colorScheme === 'dark' ? 'dark.7' : 'white'}>
									<Stack gap="md">
										<TextInput
											label={t('product_edit.spu')}
											placeholder={t('product_edit.spu_placeholder')}
											withAsterisk
											key={form.key('spu')}
											{...form.getInputProps('spu')}
										/>

										<TextInput
											label={t('product_edit.product_name')}
											placeholder={t('product_edit.product_name_placeholder')}
											withAsterisk
											key={form.key('name')}
											{...form.getInputProps('name')}
										/>

										<Textarea
											label={t('product_edit.product_description')}
											placeholder={t('product_edit.product_description_placeholder')}
											withAsterisk
											styles={{
												input: {
													minHeight: '80px',
													maxHeight: '160px',
													resize: 'vertical',
												},
											}}
											key={form.key('description')}
											{...form.getInputProps('description')}
										/>
									</Stack>
								</Box>
							</Card>

							{/* 产品变体 - Variants */}
							<ProductVariantsCard variants={variants} onChange={onVariantsChange} />

							{/* 产品图片 */}
							<Card shadow="sm" radius="md" withBorder padding={0} style={{ overflow: 'hidden' }}>
								<Box
									p="md"
									bg={colorScheme === 'dark' ? 'dark.6' : 'gray.1'}
									style={{
										borderBottom: `1px solid ${
											colorScheme === 'dark'
												? 'var(--mantine-color-dark-4)'
												: 'var(--mantine-color-gray-3)'
										}`,
									}}
								>
									<Text size="md" fw={600} c={colorScheme === 'dark' ? 'gray.3' : 'gray.8'}>
										{t('product_edit.product_images')}
									</Text>
								</Box>
								<Box p="lg" bg={colorScheme === 'dark' ? 'dark.7' : 'white'}>
									<ProductImageCard images={images} onChange={onImagesChange} />
								</Box>
							</Card>
						</Stack>
					</Grid.Col>

					{/* 右侧 - 分类和设置 */}
					<Grid.Col span={{ base: 12, md: 4 }}>
						<Stack gap="lg">
							{/* 分类和状态 */}
							<Card shadow="sm" radius="md" withBorder padding={0} style={{ overflow: 'hidden' }}>
								<Box
									p="md"
									bg={colorScheme === 'dark' ? 'dark.6' : 'gray.1'}
									style={{
										borderBottom: `1px solid ${
											colorScheme === 'dark'
												? 'var(--mantine-color-dark-4)'
												: 'var(--mantine-color-gray-3)'
										}`,
									}}
								>
									<Text size="md" fw={600} c={colorScheme === 'dark' ? 'gray.3' : 'gray.8'}>
										{t('product_edit.category_status')}
									</Text>
								</Box>
								<Box p="lg" bg={colorScheme === 'dark' ? 'dark.7' : 'white'}>
									<Stack gap="md">
										<Select
											label={t('product_edit.category')}
											placeholder={t('product_edit.select_category_placeholder')}
											withAsterisk
											data={translatedCategoryOptions}
											key={form.key('category')}
											{...form.getInputProps('category')}
										/>

										<Select
											label={t('product_edit.status')}
											placeholder={t('product_edit.select_status_placeholder')}
											withAsterisk
											data={translatedStatusOptions}
											key={form.key('status')}
											{...form.getInputProps('status')}
										/>

										<Switch
											label={t('product_edit.featured_product')}
											description={t('product_edit.featured_description')}
											key={form.key('featured')}
											{...form.getInputProps('featured', { type: 'checkbox' })}
										/>
									</Stack>
								</Box>
							</Card>

							{/* 操作按钮 */}
							<Card shadow="sm" radius="md" withBorder padding={0} style={{ overflow: 'hidden' }}>
								<Box
									p="md"
									bg={colorScheme === 'dark' ? 'dark.6' : 'gray.1'}
									style={{
										borderBottom: `1px solid ${
											colorScheme === 'dark'
												? 'var(--mantine-color-dark-4)'
												: 'var(--mantine-color-gray-3)'
										}`,
									}}
								>
									<Text size="md" fw={600} c={colorScheme === 'dark' ? 'gray.3' : 'gray.8'}>
										{t('common.actions')}
									</Text>
								</Box>
								<Box p="lg" bg={colorScheme === 'dark' ? 'dark.7' : 'white'}>
									<Stack gap="md">
										<Button type="submit" fullWidth leftSection={<IconDeviceFloppy size={16} />}>
											{isEditMode ? t('common.save_changes') : t('product_edit.create_product')}
										</Button>

										<Button variant="default" fullWidth onClick={onCancel}>
											{t('common.cancel')}
										</Button>

										{isEditMode && (
											<Button variant="light" color="red" fullWidth>
												{t('common.delete')} {t('nav.products')}
											</Button>
										)}
									</Stack>
								</Box>
							</Card>

							{/* 产品信息 */}
							{isEditMode && (
								<Card shadow="sm" radius="md" withBorder padding={0} style={{ overflow: 'hidden' }}>
									<Box
										p="md"
										bg={colorScheme === 'dark' ? 'dark.6' : 'gray.1'}
										style={{
											borderBottom: `1px solid ${
												colorScheme === 'dark'
													? 'var(--mantine-color-dark-4)'
													: 'var(--mantine-color-gray-3)'
											}`,
										}}
									>
										<Text size="md" fw={600} c={colorScheme === 'dark' ? 'gray.3' : 'gray.8'}>
											{t('product_edit.product_info')}
										</Text>
									</Box>
									<Box p="lg" bg={colorScheme === 'dark' ? 'dark.7' : 'white'}>
										<Stack gap="xs">
											<Text size="xs" c="dimmed">
												{t('product_edit.created_at')}:{' '}
												{createdAt ? createdAt.toLocaleDateString() : '-'}
											</Text>
											<Text size="xs" c="dimmed">
												{t('product_edit.updated_at')}:{' '}
												{updatedAt ? updatedAt.toLocaleDateString() : '-'}
											</Text>
											<Text size="xs" c="dimmed">
												{t('product_edit.views')}:{' '}
												{views !== undefined ? views.toLocaleString() : '-'}
											</Text>
										</Stack>
									</Box>
								</Card>
							)}
						</Stack>
					</Grid.Col>
				</Grid>
			</form>
		</>
	);
}
