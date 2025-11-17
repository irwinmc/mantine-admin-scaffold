/**
 * ProductEdit 页面 - 编辑现有产品
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container, Stack, Loader, Center, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { ProductForm } from './components/ProductForm';
import { productSchema, type ProductFormValues } from './schemas';
import { useProductsStore } from './store';
import type { ProductVariant } from './types';

export function ProductEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslation();
	const [loading, setLoading] = useState(true);
	const [variants, setVariants] = useState<ProductVariant[]>([]);
	const [images, setImages] = useState<string[]>([]);

	const getProductById = useProductsStore(state => state.getProductById);
	const updateProduct = useProductsStore(state => state.updateProduct);

	const form = useForm<ProductFormValues>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			spu: '',
			category: '',
			status: 'active',
			featured: false,
			images: [],
		},
		validate: zod4Resolver(productSchema),
	});

	// 加载产品数据
	useEffect(() => {
		const loadProduct = async () => {
			if (!id) {
				navigate('/products');
				return;
			}

			try {
				setLoading(true);
				console.log('Loading product:', id);

				// 模拟 API 延迟
				await new Promise(resolve => setTimeout(resolve, 500));

				// 从 store 获取产品数据
				const product = getProductById(Number(id));

				if (!product) {
					notifications.show({
						title: t('messages.error'),
						message: t('messages.error_load'),
						color: 'red',
					});
					navigate('/products');
					return;
				}

				// 设置表单值
				form.setValues({
					name: product.name,
					description: product.description || '',
					spu: product.spu,
					category: product.category,
					status: product.status,
					featured: product.featured || false,
					images: product.images || [],
				});

				// 设置变体和图片
				setVariants(product.variants);
				setImages(product.images || []);

				// TODO: 如果需要，可以在这里调用 API 获取最新数据
				// const response = await fetch(`/api/products/${id}`);
				// const data = await response.json();
			} catch (error) {
				console.error('Failed to load product:', error);
				notifications.show({
					title: t('messages.error'),
					message: t('messages.error_load'),
					color: 'red',
				});
				navigate('/products');
			} finally {
				setLoading(false);
			}
		};

		loadProduct();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleSubmit = async (values: ProductFormValues) => {
		try {
			if (!id) return;

			// 验证至少有一个变体
			if (variants.length === 0) {
				notifications.show({
					title: t('messages.error'),
					message: t('product_edit.at_least_one_variant'),
					color: 'red',
				});
				return;
			}

			// 使用 store 更新产品
			updateProduct(Number(id), values, variants, images);
			console.log('Updated product:', id, values, variants, images);

			// TODO: 如果需要，可以在这里调用 API 同步到后端
			// const response = await fetch(`/api/products/${id}`, {
			//   method: 'PUT',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ ...values, variants }),
			// });

			notifications.show({
				title: t('messages.success_update'),
				message: t('product_edit.product_updated'),
				color: 'green',
			});

			// 返回产品列表
			navigate('/products');
		} catch (error) {
			console.error('Failed to update product:', error);
			notifications.show({
				title: t('messages.error'),
				message: t('messages.error_update'),
				color: 'red',
			});
		}
	};

	const handleCancel = () => {
		navigate('/products');
	};

	if (loading) {
		return (
			<Container size="lg">
				<Center h={400}>
					<Stack align="center" gap="md">
						<Loader size="lg" />
						<Text c="dimmed">{t('common.loading')}</Text>
					</Stack>
				</Center>
			</Container>
		);
	}

	return (
		<Container size="lg">
			<Stack gap="lg">
				<ProductForm
					form={form}
					isEditMode={true}
					id={id}
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					variants={variants}
					onVariantsChange={setVariants}
					images={images}
					onImagesChange={setImages}
				/>
			</Stack>
		</Container>
	);
}

export default ProductEdit;
