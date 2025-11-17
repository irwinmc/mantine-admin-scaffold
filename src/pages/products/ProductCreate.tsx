/**
 * ProductCreate 页面 - 创建新产品
 */

import { useNavigate } from 'react-router';
import { Container, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';
import { ProductForm } from './components/ProductForm';
import { productSchema, type ProductFormValues } from './schemas';

export function ProductCreate() {
	const navigate = useNavigate();
	const { t } = useTranslation();

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
			console.log('Creating product:', values);

			// TODO: 调用创建 API
			// const response = await fetch('/api/products', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(values),
			// });
			// const data = await response.json();

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

	return (
		<Container size="lg">
			<Stack gap="lg">
				<ProductForm form={form} isEditMode={false} onSubmit={handleSubmit} onCancel={handleCancel} />
			</Stack>
		</Container>
	);
}

export default ProductCreate;
