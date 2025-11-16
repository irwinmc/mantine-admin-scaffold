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
import { ProductForm } from '../components/ProductForm';
import { productSchema, type ProductFormValues } from './schema';
import { mockProduct } from './data/mockData';

export function ProductEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslation();
	const [loading, setLoading] = useState(true);

	const form = useForm<ProductFormValues>({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			price: 0,
			cost: 0,
			stock: 0,
			sku: '',
			category: '',
			status: 'draft',
			featured: false,
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

				// TODO: 调用获取产品详情 API
				// const response = await fetch(`/api/products/${id}`);
				// const data = await response.json();

				// 模拟 API 延迟
				await new Promise(resolve => setTimeout(resolve, 500));

				// 使用模拟数据
				form.setValues({
					name: mockProduct.name,
					description: mockProduct.description,
					price: mockProduct.price,
					cost: mockProduct.cost,
					stock: mockProduct.stock,
					sku: mockProduct.sku,
					category: mockProduct.category,
					status: mockProduct.status,
					featured: mockProduct.featured,
				});
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
			console.log('Updating product:', id, values);

			// TODO: 调用更新 API
			// const response = await fetch(`/api/products/${id}`, {
			//   method: 'PUT',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(values),
			// });
			// const data = await response.json();

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
				<ProductForm form={form} isEditMode={true} id={id} onSubmit={handleSubmit} onCancel={handleCancel} />
			</Stack>
		</Container>
	);
}

export default ProductEdit;
