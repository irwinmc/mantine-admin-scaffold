/**
 * OrderList DataTable 列配置
 */

import { Text, ActionIcon, Group, Badge } from '@mantine/core';
import { IconTrash, IconEye } from '@tabler/icons-react';
import type { DataTableColumn } from 'mantine-datatable';
import type { Order } from './types';

interface ColumnsParams {
	t: (key: string) => string;
	handleView: (id: string) => void;
	handleDelete: (id: string) => void;
}

export const getOrderListColumns = ({ t, handleView, handleDelete }: ColumnsParams): DataTableColumn<Order>[] => [
	{
		accessor: 'id',
		title: t('orders.order_id'),
		sortable: true,
		width: 120,
	},
	{
		accessor: 'customer',
		title: t('orders.customer'),
		sortable: true,
		width: 150,
	},
	{
		accessor: 'productName',
		title: t('orders.product_name'),
		sortable: true,
	},
	{
		accessor: 'orderDate',
		title: t('orders.order_date'),
		sortable: true,
		width: 150,
		render: order => order.orderDate.toLocaleDateString(),
	},
	{
		accessor: 'amount',
		title: t('orders.amount'),
		sortable: true,
		width: 100,
		render: order => (
			<Text size="sm" fw={600}>
				${order.amount.toFixed(2)}
			</Text>
		),
	},
	{
		accessor: 'paymentMethod',
		title: t('orders.payment_method'),
		sortable: true,
		width: 150,
		render: order => {
			const methodLabels: Record<string, string> = {
				credit_card: 'Credit Card',
				paypal: 'PayPal',
				bank_transfer: 'Bank Transfer',
			};
			return <Text size="sm">{methodLabels[order.paymentMethod] || order.paymentMethod}</Text>;
		},
	},
	{
		accessor: 'status',
		title: t('orders.status'),
		sortable: true,
		width: 120,
		render: order => {
			const statusColors: Record<string, string> = {
				paid: 'green',
				shipped: 'blue',
				completed: 'teal',
			};
			const statusLabels: Record<string, string> = {
				paid: 'Paid',
				shipped: 'Shipped',
				completed: 'Completed',
			};
			return (
				<Badge variant="light" color={statusColors[order.status] || 'gray'}>
					{statusLabels[order.status] || order.status}
				</Badge>
			);
		},
	},
	{
		accessor: 'actions',
		title: t('orders.actions'),
		width: 120,
		textAlign: 'center',
		render: order => (
			<Group gap={4} justify="center" wrap="nowrap">
				<ActionIcon size="sm" variant="subtle" color="blue" onClick={() => handleView(order.id)}>
					<IconEye size={16} />
				</ActionIcon>
				<ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDelete(order.id)}>
					<IconTrash size={16} />
				</ActionIcon>
			</Group>
		),
	},
];
