/**
 * ProductEdit Form 组件
 */

import type { UseFormReturnType } from '@mantine/form';
import {
	Paper,
	TextInput,
	Textarea,
	NumberInput,
	Select,
	Button,
	Group,
	Stack,
	Grid,
	FileInput,
	Switch,
	Badge,
	Avatar,
	Box,
	Text,
	useMantineColorScheme,
} from '@mantine/core';
import { IconUpload, IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import type { ProductFormValues } from '../schema';
import { categoryOptions, statusOptions } from '../constants';
import { mockProduct } from '../data/mockData';

interface ProductFormProps {
	form: UseFormReturnType<ProductFormValues>;
	isEditMode: boolean;
	id?: string;
	onSubmit: (values: ProductFormValues) => void;
	onCancel: () => void;
}

export function ProductForm({ form, isEditMode, id, onSubmit, onCancel }: ProductFormProps) {
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
							<Paper shadow="sm" p="lg" radius="md" withBorder>
								<Stack gap="md">
									<Text size="lg" fw={600}>
										{t('product_edit.basic_information')}
									</Text>

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
										minRows={4}
										maxRows={8}
										key={form.key('description')}
										{...form.getInputProps('description')}
									/>

									<TextInput
										label={t('product_edit.sku')}
										placeholder={t('product_edit.sku_placeholder')}
										withAsterisk
										key={form.key('sku')}
										{...form.getInputProps('sku')}
									/>
								</Stack>
							</Paper>

							{/* 价格和库存 */}
							<Paper shadow="sm" p="lg" radius="md" withBorder>
								<Stack gap="md">
									<Text size="lg" fw={600}>
										{t('product_edit.pricing_inventory')}
									</Text>

									<Grid>
										<Grid.Col span={6}>
											<NumberInput
												label={t('product_edit.selling_price')}
												placeholder="0.00"
												withAsterisk
												prefix="$"
												decimalScale={2}
												fixedDecimalScale
												min={0}
												key={form.key('price')}
												{...form.getInputProps('price')}
											/>
										</Grid.Col>
										<Grid.Col span={6}>
											<NumberInput
												label={t('product_edit.cost_price')}
												placeholder="0.00"
												withAsterisk
												prefix="$"
												decimalScale={2}
												fixedDecimalScale
												min={0}
												key={form.key('cost')}
												{...form.getInputProps('cost')}
											/>
										</Grid.Col>
									</Grid>

									<NumberInput
										label={t('product_edit.stock_quantity')}
										placeholder="0"
										withAsterisk
										min={0}
										key={form.key('stock')}
										{...form.getInputProps('stock')}
									/>

									{/* 利润预估 */}
									{form.getValues().price > 0 && form.getValues().cost > 0 && (
										<Box p="sm" bg={colorScheme === 'dark' ? 'dark.5' : 'gray.0'} style={{ borderRadius: 8 }}>
											<Text size="sm" c="dimmed">
												{t('product_edit.estimated_profit')}:{' '}
												<Text component="span" fw={600} c="green">
													${(form.getValues().price - form.getValues().cost).toFixed(2)}
												</Text>{' '}
												(
												{(
													((form.getValues().price - form.getValues().cost) / form.getValues().price) *
													100
												).toFixed(1)}
												%)
											</Text>
										</Box>
									)}
								</Stack>
							</Paper>

							{/* 产品图片 */}
							<Paper shadow="sm" p="lg" radius="md" withBorder>
								<Stack gap="md">
									<Text size="lg" fw={600}>
										{t('product_edit.product_image')}
									</Text>

									{isEditMode && mockProduct.image && (
										<Group>
											<Avatar src={mockProduct.image} size={80} radius="md" />
											<Text size="sm" c="dimmed">
												{t('product_edit.current_image')}
											</Text>
										</Group>
									)}

									<FileInput
										label={t('product_edit.upload_new_image')}
										placeholder={t('product_edit.select_image_file')}
										leftSection={<IconUpload size={16} />}
										accept="image/*"
										clearable
									/>

									<Text size="xs" c="dimmed">
										{t('product_edit.image_requirements')}
									</Text>
								</Stack>
							</Paper>
						</Stack>
					</Grid.Col>

					{/* 右侧 - 分类和设置 */}
					<Grid.Col span={{ base: 12, md: 4 }}>
						<Stack gap="lg">
							{/* 分类和状态 */}
							<Paper shadow="sm" p="lg" radius="md" withBorder>
								<Stack gap="md">
									<Text size="lg" fw={600}>
										{t('product_edit.category_status')}
									</Text>

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
							</Paper>

							{/* 操作按钮 */}
							<Paper shadow="sm" p="lg" radius="md" withBorder>
								<Stack gap="md">
									<Text size="lg" fw={600}>
										{t('common.actions')}
									</Text>

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
							</Paper>

							{/* 产品信息 */}
							{isEditMode && (
								<Paper shadow="sm" p="lg" radius="md" withBorder>
									<Stack gap="xs">
										<Text size="sm" fw={600}>
											{t('product_edit.product_info')}
										</Text>
										<Text size="xs" c="dimmed">
											{t('product_edit.created_at')}: 2024-01-15
										</Text>
										<Text size="xs" c="dimmed">
											{t('product_edit.updated_at')}: 2024-03-10
										</Text>
										<Text size="xs" c="dimmed">
											{t('product_edit.views')}: 1,234
										</Text>
									</Stack>
								</Paper>
							)}
						</Stack>
					</Grid.Col>
				</Grid>
			</form>
		</>
	);
}

