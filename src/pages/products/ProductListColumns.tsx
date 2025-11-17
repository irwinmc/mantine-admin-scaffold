/**
 * ProductList DataTable 列配置
 */

import type { ReactElement } from 'react';
import { Text, ActionIcon, Group, Rating, Avatar, Stack } from '@mantine/core';
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
import type { DataTableColumn } from 'mantine-datatable';
import type { Product } from './types';

interface ColumnsParams {
	t: (key: string) => string;
	getStockBadge: (stock: number) => ReactElement;
	handleView: (id: number) => void;
	handleEdit: (id: number) => void;
	handleDelete: (id: number) => void;
}

export const getProductListColumns = ({
	t,
	getStockBadge,
	handleView,
	handleEdit,
	handleDelete,
}: ColumnsParams): DataTableColumn<Product>[] => [
	{
		accessor: 'name',
		title: t('products.product_info'),
		sortable: true,
		width: 300,
		render: product => (
			<Group gap="md" wrap="nowrap" py={4}>
				<Avatar src={product.images[0] || ''} alt={product.name} size={40} radius="sm" />
				<Stack gap={4}>
					<Text fw={500} size="sm">
						{product.name}
					</Text>
					<Text size="xs" c="dimmed">
						SPU: {product.spu}
					</Text>
				</Stack>
			</Group>
		),
	},
	{
		accessor: 'variants',
		title: t('products.price'),
		sortable: false,
		width: 120,
		render: product => (
			<Text size="sm" fw={600}>
				${(product.variants[0]?.price || 0).toFixed(2)}
			</Text>
		),
	},
	{
		accessor: 'variants',
		title: t('products.stock'),
		sortable: false,
		width: 150,
		render: product => {
			const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
			return (
				<Group gap="xs">
					<Text size="sm">{totalStock}</Text>
					{getStockBadge(totalStock)}
				</Group>
			);
		},
	},
	{
		accessor: 'rating',
		title: t('products.rating'),
		sortable: true,
		width: 140,
		render: product => (
			<Group gap="xs">
				<Rating value={product.rating} fractions={2} readOnly size="sm" />
				<Text size="sm" c="dimmed">
					({product.rating})
				</Text>
			</Group>
		),
	},
	{
		accessor: 'createdAt',
		title: t('products.created_date'),
		sortable: true,
		width: 140,
		render: product => product.createdAt.toLocaleDateString(),
	},
	{
		accessor: 'actions',
		title: t('products.actions'),
		width: 120,
		textAlign: 'center',
		render: product => (
			<Group gap={4} justify="center" wrap="nowrap">
				<ActionIcon size="sm" variant="subtle" color="blue" onClick={() => handleView(product.id)}>
					<IconEye size={16} />
				</ActionIcon>
				<ActionIcon size="sm" variant="subtle" color="green" onClick={() => handleEdit(product.id)}>
					<IconEdit size={16} />
				</ActionIcon>
				<ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDelete(product.id)}>
					<IconTrash size={16} />
				</ActionIcon>
			</Group>
		),
	},
];
