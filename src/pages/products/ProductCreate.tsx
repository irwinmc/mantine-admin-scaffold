/**
 * ProductCreate 页面 - 创建新产品
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { ProductForm, ProductVariantModal } from './components';
import { productSchema, type ProductFormValues } from './schemas';
import { useProductsStore } from './store';
import type { ProductVariant } from './types';

export function ProductCreate() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const createProduct = useProductsStore(state => state.createProduct);
	const [variants, setVariants] = useState<ProductVariant[]>([]);
	const [images, setImages] = useState<string[]>([]);
	const [modalOpened, setModalOpened] = useState(false);
	const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

	const form = useForm<ProductFormValues>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			spu: '',
			category: '',
			status: 'active',
			featured: false,
		},
		validate: zod4Resolver(productSchema),
	});

	const handleSubmit = async (values: ProductFormValues) => {
		try {
			// 验证至少有一个变体
			if (variants.length === 0) {
				notifications.show({
					title: t('messages.error'),
					message: t('product_edit.at_least_one_variant'),
					color: 'red',
				});
				return;
			}

			// 使用 store 创建产品
			const newProduct = createProduct(values, variants, images);
			console.log('Created product:', newProduct);

			// TODO: 如果需要，可以在这里调用 API 同步到后端
			// const response = await fetch('/api/products', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ ...values, variants }),
			// });

			notifications.show({
				title: t('messages.success_create'),
				message: t('product_edit.product_created'),
				color: 'green',
			});

			// 返回产品列表
			navigate('/products');
		} catch (error) {
			console.error('Failed to create product:', error);
			notifications.show({
				title: t('messages.error'),
				message: t('messages.error_create'),
				color: 'red',
			});
		}
	};

	const handleCancel = () => {
		navigate('/products');
	};

	const handleVariantAdd = () => {
		setEditingVariant(null);
		setModalOpened(true);
	};

	const handleVariantEdit = (variant: ProductVariant) => {
		setEditingVariant(variant);
		setModalOpened(true);
	};

	const handleVariantDelete = (id: string) => {
		setVariants(variants.filter(v => v.id !== id));
	};

	const handleVariantSave = (variant: ProductVariant) => {
		if (editingVariant) {
			// 更新现有变体
			setVariants(variants.map(v => (v.id === variant.id ? variant : v)));
		} else {
			// 添加新变体
			setVariants([...variants, variant]);
		}
		setModalOpened(false);
		setEditingVariant(null);
	};

	const handleModalCancel = () => {
		setModalOpened(false);
		setEditingVariant(null);
	};

	return (
		<Container size="lg">
			<Stack gap="lg">
				<ProductForm
					form={form}
					isEditMode={false}
					variants={variants}
					images={images}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					onImagesChange={setImages}
					onVariantAdd={handleVariantAdd}
					onVariantEdit={handleVariantEdit}
					onVariantDelete={handleVariantDelete}
				/>

				<ProductVariantModal
					opened={modalOpened}
					variant={editingVariant}
					onSave={handleVariantSave}
					onCancel={handleModalCancel}
				/>
			</Stack>
		</Container>
	);
}

export default ProductCreate;
