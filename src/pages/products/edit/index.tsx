/**
 * ProductEdit 页面
 */

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { ProductForm } from './components/ProductForm';
import { productSchema, type ProductFormValues } from './schema';
import { mockProduct } from './data/mockData';

export function ProductEdit() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslation();
	const isEditMode = !!id;

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

	// 加载产品数据（编辑模式）
	useEffect(() => {
		if (isEditMode) {
			// TODO: 从 API 加载产品数据
			// 这里使用模拟数据
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEditMode]);

	const handleSubmit = (values: ProductFormValues) => {
		console.log('Form values:', values);

		// TODO: 提交到 API
		notifications.show({
			title: isEditMode ? t('messages.success_update') : t('messages.success_create'),
			message: isEditMode ? t('product_edit.product_updated') : t('product_edit.product_created'),
			color: 'green',
		});

		// 返回产品列表
		navigate('/products');
	};

	const handleCancel = () => {
		navigate('/products');
	};

	return (
		<Container size="lg">
			<Stack gap="lg">
				<ProductForm form={form} isEditMode={isEditMode} id={id} onSubmit={handleSubmit} onCancel={handleCancel} />
			</Stack>
		</Container>
	);
}

export default ProductEdit;
