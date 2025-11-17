/**
 * ProductVariantModal - 产品变体编辑 Modal
 */

import { useEffect } from 'react';
import { Modal, TextInput, NumberInput, Select, Button, Group, Stack, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import type { ProductVariant } from '../types';

interface ProductVariantModalProps {
	opened: boolean;
	variant: ProductVariant | null;
	onSave: (variant: ProductVariant) => void;
	onCancel: () => void;
}

export function ProductVariantModal({ opened, variant, onSave, onCancel }: ProductVariantModalProps) {
	const { t } = useTranslation();
	const isEditMode = !!variant;

	const form = useForm({
		initialValues: {
			sku: '',
			size: '',
			color: '',
			price: 0,
			stock: 0,
		},
	});

	// 当 modal 打开或 variant 改变时，更新表单值
	useEffect(() => {
		if (opened) {
			if (variant) {
				form.setValues({
					sku: variant.sku,
					size: variant.size || '',
					color: variant.color || '',
					price: variant.price,
					stock: variant.stock,
				});
			} else {
				form.reset();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opened, variant]);

	const handleSubmit = (values: typeof form.values) => {
		onSave({
			id: variant?.id || Math.random().toString(36).substr(2, 9),
			sku: values.sku,
			size: values.size || undefined,
			color: values.color || undefined,
			price: values.price,
			stock: values.stock,
		});
	};

	const handleClear = () => {
		form.reset();
	};

	// Size 和 Color 选项
	const sizeOptions = [
		{ value: '36', label: 'EU 36' },
		{ value: '37', label: 'EU 37' },
		{ value: '38', label: 'EU 38' },
		{ value: '39', label: 'EU 39' },
		{ value: '40', label: 'EU 40' },
		{ value: '41', label: 'EU 41' },
		{ value: '42', label: 'EU 42' },
		{ value: '43', label: 'EU 43' },
		{ value: '44', label: 'EU 44' },
		{ value: '45', label: 'EU 45' },
	];

	const colorOptions = [
		{ value: 'white', label: t('product_edit.color_white') },
		{ value: 'black', label: t('product_edit.color_black') },
		{ value: 'red', label: t('product_edit.color_red') },
		{ value: 'blue', label: t('product_edit.color_blue') },
		{ value: 'green', label: t('product_edit.color_green') },
		{ value: 'yellow', label: t('product_edit.color_yellow') },
	];

	return (
		<Modal
			opened={opened}
			onClose={onCancel}
			title={isEditMode ? t('product_edit.edit_variant') : t('product_edit.add_variant')}
			size="lg"
			centered
		>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack gap="md">
					<TextInput
						label={t('product_edit.sku')}
						placeholder={t('product_edit.sku_placeholder')}
						withAsterisk
						{...form.getInputProps('sku')}
					/>

					<Grid>
						<Grid.Col span={6}>
							<Select
								label={t('product_edit.size')}
								placeholder={t('product_edit.select_size')}
								data={sizeOptions}
								searchable
								{...form.getInputProps('size')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<Select
								label={t('product_edit.color')}
								placeholder={t('product_edit.select_color')}
								data={colorOptions}
								{...form.getInputProps('color')}
							/>
						</Grid.Col>
					</Grid>

					<Grid>
						<Grid.Col span={6}>
							<NumberInput
								label={t('product_edit.stock_quantity')}
								placeholder={t('product_edit.quantity_placeholder')}
								min={0}
								{...form.getInputProps('stock')}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<NumberInput
								label={t('common.price')}
								placeholder="0.00"
								prefix="$"
								decimalScale={2}
								fixedDecimalScale
								min={0}
								{...form.getInputProps('price')}
							/>
						</Grid.Col>
					</Grid>

					<Group justify="flex-end" gap="sm" mt="md">
						{!isEditMode && (
							<Button variant="default" onClick={handleClear}>
								{t('common.clear')}
							</Button>
						)}
						{isEditMode && (
							<Button variant="default" onClick={onCancel}>
								{t('common.cancel')}
							</Button>
						)}
						<Button type="submit" color="dark">
							{isEditMode ? t('product_edit.update_variant') : t('product_edit.add_variant')}
						</Button>
					</Group>
				</Stack>
			</form>
		</Modal>
	);
}
